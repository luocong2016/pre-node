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
          color: color,
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
          console.log(`${properties.name} province: `, province)

          map.add(province)
        })

        console.log("map:", map)

        scene.add(map)
      }

      // 渲染
      function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }

      requestAnimationFrame(render)
    })

    return () => <canvas ref={canvasRef} width="1000" height="500" />
  },
})
