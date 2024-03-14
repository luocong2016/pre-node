import { defineComponent, watch, computed } from "vue"
import { Space, Button } from "ant-design-vue"
import { useActiveElement } from "@vueuse/core"

export default defineComponent({
  setup() {
    const activeElement = useActiveElement()
    const key = computed(() => activeElement.value?.dataset?.id || "null")

    watch(activeElement, (el) => {
      console.log("focus changed to", el)
    })

    return () => (
      <Space size={[8, 16]} wrap>
        {Array(20)
          .fill(undefined)
          .map((_, i) => (
            <Button type={key.value === String(i) ? "primary" : "default"} data-id={i}>
              Button
            </Button>
          ))}
      </Space>
    )
  },
})
