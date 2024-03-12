import { defineComponent } from "vue"
import { useMouse } from "@vueuse/core"

export default defineComponent({
  meta: {
    title: "Get Started",
  },
  setup() {
    const { x, y } = useMouse()

    return () => (
      <div style="width: 500px;height: 500px;border:1px solid red;">
        {x.value}-{y.value}
      </div>
    )
  },
})
