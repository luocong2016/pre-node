import G6 from "@antv/g6"
import { defineComponent, ref, onMounted } from "vue"
import { data } from "../data"

export default defineComponent({
  meta: {
    title: "快速上手 > 第一个示例",
  },
  setup() {
    const container = ref<HTMLElement>()

    onMounted(() => {
      const graph = new G6.Graph({
        container: container.value!,
        width: 800,
        height: 500,
      })

      graph.data(data)
      graph.render()
    })

    return () => <div ref={container} />
  },
})
