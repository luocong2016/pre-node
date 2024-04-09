import { defineComponent, ref, onMounted } from "vue"
// @ts-ignore
import * as d3 from "d3"
import * as THREE from "three"
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export default defineComponent({
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()

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
      var axes = new THREE.AxesHelper(700)
      scene.add(axes)

      {
        const color = 0xffffff
        const intensity = 1
        // 环境光
        const light = new THREE.AmbientLight(color, intensity)
        // 加入场景
        scene.add(light)
      }

      const loader = new THREE.FileLoader()
      loader.load(`${window.location.origin}/100000_full.json`, (data) => {
        const jsondata = JSON.parse(data as string)
        operationData(jsondata)
      })

      /**
       * 立体几何图形
       * @param polygon 多边形 点数组
       * @param color 材质颜色
       * */
      function drawExtrudeMesh(polygon: any[], color: string) {
        const shape = new THREE.Shape()
        // polygon.forEach((row, i) => {
        //   const [x, y] = [row[0], row[1]]
        //   if (i === 0) {
        //     shape.moveTo(x, y)
        //   }
        //   shape.lineTo(x, y)
        // })
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
      function lineDraw(polygon: any[], color: string) {
        const lineGeometry = new THREE.BufferGeometry()
        const pointsArray = new Array()
        polygon.forEach((row) => {
          const [x, y] = projection(row)
          // 创建三维点
          pointsArray.push(new THREE.Vector3(x, -y, 9))
        })
        // 放入多个点
        lineGeometry.setFromPoints(pointsArray)

        const lineMaterial = new THREE.LineBasicMaterial({
          color: color,
        })
        return new THREE.Line(lineGeometry, lineMaterial)
      }

      const map = new THREE.Object3D()
      // 解析数据
      function operationData(jsondata: any) {
        // 全国信息
        const features = jsondata.features

        features.forEach((feature) => {
          // 单个省份 对象
          const province = new THREE.Object3D()
          // 地址
          province.properties = feature.properties.name
          const coordinates = feature.geometry.coordinates
          // const color = 'yellow'
          const color = ["重庆市", "上海市"].includes(feature.properties.name) ? "blue" : "yellow"

          if (feature.geometry.type === "MultiPolygon") {
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
          }

          if (feature.geometry.type === "Polygon") {
            // 多边形
            coordinates.forEach((coordinate) => {
              const mesh = drawExtrudeMesh(coordinate, color)
              const line = lineDraw(coordinate, color)
              province.add(line)
              province.add(mesh)
            })
          }
          map.add(province)
        })

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
