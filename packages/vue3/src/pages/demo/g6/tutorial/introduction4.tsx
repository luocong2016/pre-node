import G6, { type Graph, type GraphData, type TreeGraphData } from "@antv/g6"
import { defineComponent, onMounted, shallowRef, watch } from "vue"

export default defineComponent({
  meta: {
    title: "入门教程 > 使用图布局 Layout",
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

        defaultNode: {
          size: 30,
          labelCfg: {
            style: { fill: "#fff" },
          },
        },
        defaultEdge: {
          labelCfg: { autoRotate: true },
        },

        layout: {
          type: "force", // 指定为力导向布局，默认为 random 布局
          preventOverlap: true, // 防止节点重叠
          linkDistance: 100, // 指定边距离为100
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
