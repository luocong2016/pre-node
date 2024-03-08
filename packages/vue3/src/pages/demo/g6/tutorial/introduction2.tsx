import G6, { type Graph, type GraphData, type TreeGraphData } from "@antv/g6"
import { defineComponent, onMounted, shallowRef, watch } from "vue"

export default defineComponent({
  meta: {
    title: "入门教程 > 绘制 Tutorial 案例",
  },
  setup() {
    const container = shallowRef<HTMLElement>()
    const graph = shallowRef<Graph>()
    const data = shallowRef<GraphData | TreeGraphData>()

    async function getData() {
      const response = await fetch(
        "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      )
      data.value = await response.json()
    }

    onMounted(() => {
      graph.value = new G6.Graph({
        container: container.value!,
        width: 800,
        height: 500,

        // https://g6.antv.antgroup.com/manual/tutorial/example
        fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多
        fitViewPadding: [20, 40, 50, 20], // 画布上的四周留白宽度
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
