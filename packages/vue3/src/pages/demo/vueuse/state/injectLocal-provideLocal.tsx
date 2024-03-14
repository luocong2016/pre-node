// https://vueuse.org/shared/injectLocal/
// 扩展 inject/provide，能够调用 provideLocal 在同一组件中提供值

import { defineComponent, InjectionKey } from "vue"
import { injectLocal, provideLocal } from "@vueuse/core"

const MyInjectionKey: InjectionKey<string> = Symbol("MyInjectionKey")

const Child = defineComponent({
  setup() {
    const injectedValue = injectLocal(MyInjectionKey)

    return () => <div>{injectedValue}</div>
  },
})

export default defineComponent({
  setup() {
    provideLocal(MyInjectionKey, "lutz")

    return () => (
      <div>
        <Child />
      </div>
    )
  },
})
