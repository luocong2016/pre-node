// https://vueuse.org/shared/createInjectionState/
// 创建可以注入组件的全局状态

import { defineComponent, ref, computed } from "vue"
import { createInjectionState } from "@vueuse/core"
import { Space, Button } from "ant-design-vue"

const injectionKey = Symbol("counter-store")

const [useProvideCounterStore, useCounterStore] = createInjectionState(
  (initialValue: number) => {
    // state
    const count = ref(initialValue)

    // getters
    const double = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }

    return { count, double, increment }
  },
  {
    injectionKey,
  }
)

const Child = defineComponent({
  setup() {
    const { count, double, increment } = useCounterStore()!

    return () => (
      <Space direction="vertical">
        <Button type="primary" onClick={() => increment()}>
          +
        </Button>
        <div>{count.value}</div>
        <div>{double.value}</div>
      </Space>
    )
  },
})

export default defineComponent({
  setup() {
    useProvideCounterStore(0)

    return () => <Child />
  },
})
