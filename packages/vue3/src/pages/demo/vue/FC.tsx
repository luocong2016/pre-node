import { defineComponent, ref, computed, type FunctionalComponent } from "vue"
import { Input, Button, Space } from "ant-design-vue"

import { VueNode } from "@/layout/src/typing"
import { useBoolean } from "@/layout/src/components/hooks"

function analysis<
  K extends keyof P,
  P extends Record<string, any>,
  S extends { [K in keyof P]?: any }
>(property: K, props: P, slots?: S, params: any[] = []) {
  // 插槽优先级
  if (slots?.[property]) {
    return slots[property](...params)
  }
  if (props[property]) {
    return typeof props[property] === "function" ? props[property](...params) : props[property]
  }
  return null
}

// Vue.FC
const Child: FunctionalComponent<
  {
    title?: VueNode | (() => VueNode)
  },
  {},
  { title?: () => VueNode }
> = (props, { slots }) => {
  // 这里是并不是响应的!!!不要这么写
  const [bool, { toggle }] = useBoolean(false)
  const comp = computed(() => {
    JSON.stringify(props.title)
  })

  return (
    <div>
      {typeof props.title}: {analysis("title", props, slots)}
      <span>{comp.value}</span>
      <span>| - 这里不是响应性的</span>
      <Button onClick={() => toggle()}>{JSON.stringify(bool.value)}</Button>
    </div>
  )
}

const str = `function analysis<
  K extends keyof P,
  P extends Record<string, any>,
  S extends { [K in keyof P]?: any }
>(property: K, props: P, slots?: S, params: any[] = []) {
  // 插槽优先级
  if (slots?.[property]) {
    return slots[property](...params)
  }
  if (props[property]) {
    return typeof props[property] === "function" ? props[property](...params) : props[property]
  }
  return null
}

// Vue.FC
const Child: FunctionalComponent<
  {
    title?: VueNode | (() => VueNode)
  },
  {},
  { title?: () => VueNode }
> = (props, { slots }) => {
  return (
    <div>
      {typeof props.title}: {analysis("title", props, slots)}
    </div>
  )
}`

export default defineComponent({
  setup() {
    const search = ref("")
    const titleDom = <>DOM props.title 不是动态 {search.value}</>

    return () => (
      <>
        <div>FunctionalComponent 执行，解构属性和插槽</div>
        <hr />
        <code>
          <pre>{str}</pre>
        </code>
        <hr />
        <Space direction="vertical">
          <Input v-model={[search.value, "value"]} allowClear />
          <Child title={search.value} />
          <Child title={titleDom} />
          <Child title={() => <> props.title function {search.value}</>} />
          <Child
            v-slots={{
              title: () => <>slots.title: {search.value}</>,
            }}
          />
        </Space>
      </>
    )
  },
})
