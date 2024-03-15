import { defineComponent, ref } from "vue"

import { Button, Space, Input } from "ant-design-vue"

const Children = defineComponent({
  props: { text: String },

  setup(props) {
    const boolean = ref(false)
    const toggle = () => {
      boolean.value = !boolean.value
    }

    const Dome = () => <span>{boolean.value ? props.text : "text"}</span>

    return () => (
      <Space align="center">
        <Button onClick={() => toggle()}>{JSON.stringify(boolean.value)}</Button>
        <Dome />
      </Space>
    )
  },
})

export default defineComponent({
  setup() {
    const search = ref()

    return () => (
      <Space align="center">
        <Input v-model={[search.value, "value"]} />
        <Children text={search.value} />
      </Space>
    )
  },
})
