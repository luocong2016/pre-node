import G6, { type Graph, type GraphData, type TreeGraphData } from "@antv/g6"
import { defineComponent, onMounted, shallowRef, watch } from "vue"

export default defineComponent({
  meta: {
    title: "入门教程 > 元素及其配置",
  },
  setup() {
    const container = shallowRef<HTMLElement>()
    const graph = shallowRef<Graph>()
    const data = shallowRef<GraphData | TreeGraphData>()

    async function getData() {
      const response = await fetch(
        "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      )
      const source: GraphData = await response.json()

      // 在数据中配置
      source.nodes?.forEach((node) => {
        if (!node.style) {
          node.style = {}
        }

        node.style.lineWidth = 1
        node.style.stroke = "#666"
        node.style.fill = "steelblue"

        switch (node.class) {
          case "c0":
            node.type = "circle" // class = 'c0' 时节点图形为 circle
            break
          case "c1":
            node.type = "rect" // class = 'c1' 时节点图形为 rect
            node.size = [35, 20] // class = 'c1' 时节点大小
            break
          case "c2":
            node.type = "ellipse" // class = 'c2' 时节点图形为 ellipse
            node.size = [35, 20] // class = 'c2' 时节点大小
            break
          default:
            break
        }
      })

      source.edges?.forEach((edge) => {
        if (!edge.style) {
          edge.style = {}
        }
        edge.style.lineWidth = edge.weight as number
        edge.style.opacity = 0.6
        edge.style.stroke = "grey"
      })

      data.value = source
    }

    onMounted(() => {
      graph.value = new G6.Graph({
        container: container.value!,
        width: 800,
        height: 500,

        // https://g6.antv.antgroup.com/manual/tutorial/example
        fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多
        fitViewPadding: [20, 40, 50, 20], // 画布上的四周留白宽度

        /* 实例化图时全局配置 */
        // 节点在默认状态下的样式配置（style）和其他配置
        defaultNode: {
          size: 30, // 节点大小
          // 节点样式配置
          style: {
            fill: "steelblue", // 节点填充色
            stroke: "#666", // 节点描边色
            lineWidth: 1, // 节点描边粗细
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#fff", // 节点标签文字颜色
            },
          },
        },
        // 边在默认状态下的样式配置（style）和其他配置
        defaultEdge: {
          // 边样式配置
          style: {
            opacity: 0.6, // 边透明度
            stroke: "grey", // 边描边颜色
          },
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true, // 边上的标签文本根据边的方向旋转
          },
        },
      })

      getData()
    })

    watch(data, (val) => {
      if (!graph.value) return

      graph.value.data(val)
      graph.value.render()
    })

    return () => <div ref={container} />
  },
})
