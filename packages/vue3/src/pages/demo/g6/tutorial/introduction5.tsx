import G6, { type Graph, type GraphData, type TreeGraphData } from "@antv/g6"
import { defineComponent, onMounted, shallowRef, watch } from "vue"

export default defineComponent({
  meta: {
    title: "入门教程 > 图交互 Behavior",
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

    function handleEvents() {
      if (!graph.value) return

      /* 
        监听事件并切换元素状态
        graph.on('type:event', fn)
        graph.off('type:event', fn)
        type: node | edge
        https://g6.antv.antgroup.com/api/Event
      */

      // 鼠标进入节点
      graph.value.on("node:mouseenter", (e) => {
        const nodeItem = e.item
        if (!nodeItem) return
        // 设置当前节点的 hover 状态为 true
        graph.value?.setItemState(nodeItem, "hover", true)
      })

      // 鼠标离开节点
      graph.value.on("node:mouseleave", (e) => {
        const nodeItem = e.item
        if (!nodeItem) return
        // 设置当前节点的 hover 状态为 false
        graph.value?.setItemState(nodeItem, "hover", false)
      })
    }

    onMounted(() => {
      graph.value = new G6.Graph({
        container: container.value!,
        width: 800,
        height: 500,

        // https://g6.antv.antgroup.com/manual/tutorial/example
        fitView: true, // 是否将图适配到画布大小，可以防止超出画布或留白太多
        fitViewPadding: [20, 40, 50, 20], // 画布上的四周留白宽度

        /* 拖拽、缩放 --- 内置的交互行为 */
        modes: {
          // 允许拖拽画布、放缩画布、拖拽节点
          default: ["drag-canvas", "zoom-canvas", "drag-node"],
        },

        /* Hover、Click 改变样式 --- 状态式交互 */
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue",
          },
          // click 状态为 true 时的样式
          click: {
            stroke: "#000",
            lineWidth: 3,
          },
        },
        // 边在各状态下的样式
        edgeStateStyles: {
          // click 状态为 true 时的样式
          click: {
            stroke: "steelblue",
          },
        },
      })

      handleEvents()

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
