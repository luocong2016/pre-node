// https://vueuse.org/shared/createGlobalState/
// 将状态保持在全局范围内，以便在Vue实例之间可重复使用。

import { computed, defineComponent, ref } from "vue"
import { Space, Input, Button } from "ant-design-vue"
import { createGlobalState } from "@vueuse/core"

const useGlobalState = createGlobalState(() => {
  // state
  const count = ref(0)

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  function clear() {
    count.value = 0
  }

  return {
    count,
    doubleCount,
    increment,
    clear,
  }
})

export default defineComponent({
  setup() {
    const { count, doubleCount, increment, clear } = useGlobalState()

    return () => (
      <Space direction="vertical">
        <Space>
          <Input v-model={[count.value, "value"]} />
          <Button type="primary" onClick={() => increment()}>
            +
          </Button>
          <Button onClick={() => clear()}>清除</Button>
        </Space>

        <div>{doubleCount.value}</div>
      </Space>
    )
  },
})
