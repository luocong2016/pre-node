import { defineComponent, reactive, unref } from "vue"
import { useMouse, useDark } from "@vueuse/core"

export default defineComponent({
  meta: {
    title: "Best Practice",
  },
  setup() {
    // 将 Ref 类型转换成对象类型
    const mouse = reactive(useMouse())

    const isDark = useDark()

    return () => (
      <div style="width: 500px;height: 500px;border:1px solid red;">
        {mouse.x}-{mouse.y}
        <br />
        {unref(isDark) + ""}
      </div>
    )
  },
})
