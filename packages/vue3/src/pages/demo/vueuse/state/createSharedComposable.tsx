// https://vueuse.org/shared/createSharedComposable/
// 使一个可组合的函数可用于多个 Vue 实例

import { defineComponent } from "vue"
import { createSharedComposable, useMouse } from "@vueuse/core"

const useSharedMouse = createSharedComposable(useMouse)

const ChildA = defineComponent({
  setup() {
    const { x, y } = useSharedMouse()
    return () => (
      <div>
        {x.value}-{y.value}
      </div>
    )
  },
})

const ChildB = defineComponent({
  setup() {
    const { x, y } = useSharedMouse()
    return () => (
      <div>
        {x.value}-{y.value}
      </div>
    )
  },
})

export default defineComponent({
  setup() {
    return () => (
      <div>
        <ChildA />
        <ChildB />
      </div>
    )
  },
})
