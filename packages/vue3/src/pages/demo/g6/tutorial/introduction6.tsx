import G6, { type Graph, type GraphData, type TreeGraphData } from "@antv/g6"
import { defineComponent, onMounted, shallowRef, watch } from "vue"

export default defineComponent({
  meta: {
    title: "入门教程 > 插件与工具",
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
      // 实例化 minimap 插件
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: "minimap",
        type: "delegate",
      })

      // 实例化 grid 插件
      const grid = new G6.Grid()

      graph.value = new G6.Graph({
        container: container.value!,
        width: 800,
        height: 500,

        // https://g6.antv.antgroup.com/manual/tutorial/example
        fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多
        fitViewPadding: [20, 40, 50, 20], // 画布上的四周留白宽度

        /* 交互管理 */
        modes: {
          // 允许拖拽画布、放缩画布、拖拽节点
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            /* 节点提示框 */
            {
              type: "tooltip",
              formatText(model) {
                return `<div class="g6-card">
                <div>label: ${model.label}</div>
                <div>class: ${model.class}</div>
                <div>type: ${model.type}</div>
                <div>x: ${model.x}</div>
                <div>y: ${model.y}</div>
              <div>`
              },
            },
            /* 边提示框 */
            {
              type: "edge-tooltip",
              formatText(model) {
                return `<div class="g6-card">
                  <div>source: ${model.source}</div>
                  <div>target: ${model.target}</div>
                  <div>weight: ${model.weight}</div>
                <div>`
              },
            },
          ],
        },

        plugins: [minimap, grid],
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
