// https://vueuse.org/core/useDocumentVisibility/

import { defineComponent, watch } from "vue"
import { useDocumentVisibility } from "@vueuse/core"

export default defineComponent({
  setup() {
    const visibility = useDocumentVisibility()

    watch(
      visibility,
      (val) => {
        console.log("visibility:", val)
      },
      {
        immediate: true,
      }
    )

    return () => (
      <div style="height: 550px; border: 1px solid #ccc; overflow: auto;">
        {visibility.value}
        <div style="height: 800px; border: 1px solid #ccc;" />
      </div>
    )
  },
})
