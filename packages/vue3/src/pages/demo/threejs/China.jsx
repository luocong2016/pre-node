import { defineComponent, ref, onMounted } from "vue"
// @ts-ignore
import * as d3 from "d3"
import * as THREE from "three"
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// https://github.com/nie-ny/blog/blob/main/%E6%96%87%E7%AB%A0/three/Three.js%20-%20%E7%BB%98%E5%88%B6%E4%B8%AD%E5%9B%BD%E5%9C%B0%E5%9B%BE%EF%BC%88%E4%BA%8C%E5%8D%81%E4%B8%80%EF%BC%89.html

export default defineComponent({
  setup() {
    const canvasRef = ref()

    onMounted(() => {
      // 以北京为中心 修改坐标
      const projection = d3.geoMercator().center([116.412318, 39.909843]).translate([0, 0])

      // 渲染器
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value })

      const fov = 40 // 视野范围
      const aspect = 2 // 相机默认值 画布的宽高比
      const near = 0.1 // 近平面
      const far = 10000 // 远平面

      // 透视投影相机
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 0, 300)
      camera.lookAt(0, 0, 0)

      // 控制相机
      const controls = new OrbitControls(camera, canvasRef.value)
      controls.update()

      // 场景
      const scene = new THREE.Scene()

      // 坐标轴 辅助
      const axes = new THREE.AxesHelper(700)
      scene.add(axes)

      // 区块-防止污染
      {
        const color = 0xffffff
        const intensity = 1
        // 环境光
        const light = new THREE.AmbientLight(color, intensity)
        // 加入场景
        scene.add(light)
      }

      const loader = new THREE.FileLoader()

      // ./ 会默认当前路径这是不对的，或设置 vite/public
      loader.load(`${window.location.origin}/100000_full.json`, (data) => {
        const jsondata = JSON.parse(data)

        // { type: "FeatureCollection", }
        console.log("100000_full.json: ", jsondata)

        operationData(jsondata)
      })

      /**
       * 立体几何图形
       * @param polygon 多边形 点数组
       * @param color 材质颜色
       * */
      function drawExtrudeMesh(polygon, color) {
        const shape = new THREE.Shape()
        polygon.forEach((row, i) => {
          const [x, y] = projection(row)
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
        })

        // 拉伸
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 10,
          bevelEnabled: false,
        })
        const material = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.5,
        })
        return new THREE.Mesh(geometry, material)
      }

      /**
       * 边框 图形绘制
       * @param polygon 多边形 点数组
       * @param color 材质颜色
       * */
      function lineDraw(polygon, color) {
        const lineGeometry = new THREE.BufferGeometry()
        const pointsArray = new Array()
        polygon.forEach((row) => {
          const [x, y] = projection(row)
          // 创建三维点
          pointsArray.push(new THREE.Vector3(x, -y, 9))
        })
        // 放入多个点
        lineGeometry.setFromPoints(pointsArray)

        const lineMaterial = new THREE.LineBasicMaterial({ color })
        return new THREE.Line(lineGeometry, lineMaterial)
      }

      const map = new THREE.Object3D()

      // 解析数据 -> 全国 features 信息
      function operationData({ features }) {
        features.forEach((feature) => {
          // 单个省份 对象
          const province = new THREE.Object3D()

          const { properties, geometry } = feature

          // 地址
          province.properties = properties.name
          const { coordinates, type } = geometry

          // const color = 'yellow'
          const color = ["重庆市", "上海市"].includes(properties.name) ? "blue" : "yellow"

          // 数据中有两种类型 "MultiPolygon"、"Polygon"
          if (type === "MultiPolygon") {
            // 多个，多边形
            coordinates.forEach((coordinate) => {
              // coordinate 多边形数据
              coordinate.forEach((rows) => {
                const mesh = drawExtrudeMesh(rows, color)
                const line = lineDraw(rows, color)
                province.add(line)
                province.add(mesh)
              })
            })
          } else if (type === "Polygon") {
            // 多边形
            coordinates.forEach((coordinate) => {
              const mesh = drawExtrudeMesh(coordinate, color)
              const line = lineDraw(coordinate, color)
              province.add(line)
              province.add(mesh)
            })
          }

          // console.log(`${properties.name} province: `, province)

          map.add(province)
        })

        // console.log("map:", map)

        scene.add(map)
      }

      /**
       * 两点链接飞线
       * */
      function lineConnect(posStart, posEnd) {
        // 根据目标坐标设置3D坐标  z轴位置在地图表面
        const [x0, y0, z0] = [...posStart, 10.01]
        const [x1, y1, z1] = [...posEnd, 10.01]

        // 使用QuadraticBezierCurve3() 创建 三维二次贝塞尔曲线
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(x0, -y0, z0),
          new THREE.Vector3((x0 + x1) / 2, -(y0 + y1) / 2, 20),
          new THREE.Vector3(x1, -y1, z1)
        )

        // 绘制 目标位置
        spotCircle([x0, y0, z0])
        spotCircle([x1, y1, z1])
        moveSpot(curve)

        const lineGeometry = new THREE.BufferGeometry()
        // 获取曲线 上的50个点
        const points = curve.getPoints(50)
        const positions = []
        const colors = []
        const color = new THREE.Color()

        // 给每个顶点设置演示 实现渐变
        for (let j = 0; j < points.length; j++) {
          color.setHSL(0.81666 + j, 0.88, 0.715 + j * 0.0025) // 粉色
          colors.push(color.r, color.g, color.b)
          positions.push(points[j].x, points[j].y, points[j].z)
        }

        // 放入顶点 和 设置顶点颜色
        lineGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(positions), 3, true)
        )

        lineGeometry.setAttribute(
          "color",
          new THREE.BufferAttribute(new Float32Array(colors), 3, true)
        )

        const material = new THREE.LineBasicMaterial({
          vertexColors: true,
          side: THREE.DoubleSide,
        })
        const line = new THREE.Line(lineGeometry, material)

        return line
      }

      // 圆环网格对象组
      const circleYs = []
      /**
       * 目标位置
       * */
      function spotCircle(spot) {
        // 圆
        const geometry1 = new THREE.CircleGeometry(0.5, 200)
        const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        const circle = new THREE.Mesh(geometry1, material1)
        // 绘制地图时 y轴取反 这里同步
        circle.position.set(spot[0], -spot[1], spot[2] + 0.1)
        scene.add(circle)

        // 圆环
        const geometry2 = new THREE.RingGeometry(0.5, 0.7, 50)
        // transparent 设置 true 开启透明
        const material2 = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          side: THREE.DoubleSide,
          transparent: true,
        })
        const circleY = new THREE.Mesh(geometry2, material2)
        // 绘制地图时 y轴取反 这里同步
        circleY.position.set(spot[0], -spot[1], spot[2] + 0.1)
        scene.add(circleY)

        circleYs.push(circleY)
      }

      // 移动物体网格对象组
      const moveSpots = []
      /**
       * 线上移动物体
       * */
      function moveSpot(curve) {
        // 线上的移动物体
        const aGeo = new THREE.SphereGeometry(0.4, 0.4, 0.4)
        const aMater = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        const aMesh = new THREE.Mesh(aGeo, aMater)
        // 保存曲线实例
        aMesh.curve = curve
        aMesh._s = 0

        moveSpots.push(aMesh)

        scene.add(aMesh)
      }

      const line = lineConnect(
        projection([106.557691, 29.559296]),
        projection([121.495721, 31.236797])
      )
      scene.add(line)
      const line2 = lineConnect(
        projection([106.557691, 29.559296]),
        projection([104.006215, 30.650055])
      )
      scene.add(line2)
      const line3 = lineConnect(
        projection([106.557691, 29.559296]),
        projection([116.396795, 39.93242])
      )
      scene.add(line3)
      const line4 = lineConnect(
        projection([106.557691, 29.559296]),
        projection([87.617099, 43.863737])
      )
      scene.add(line4)

      // 渲染
      function render() {
        circleYs.forEach(function (mesh) {
          //  目标圆环放大并透明
          mesh._s += 0.01
          mesh.scale.set(1 * mesh._s, 1 * mesh._s, 1 * mesh._s)
          if (mesh._s <= 2) {
            mesh.material.opacity = 2 - mesh._s
          } else {
            mesh._s = 1
          }
        })

        moveSpots.forEach(function (mesh) {
          mesh._s += 0.006
          let tankPosition = new THREE.Vector3()
          tankPosition = mesh.curve.getPointAt(mesh._s % 1)
          mesh.position.set(tankPosition.x, tankPosition.y, tankPosition.z)
        })

        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    })

    return () => <canvas ref={canvasRef} width="1000" height="500" />
  },
})
