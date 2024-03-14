// https://vueuse.org/core/useAsyncState/
// 异步状态管理。不会阻止你的设置功能，一旦就绪，就会触发更改。默认情况下，该状态：ShallowRef

import { defineComponent } from "vue"
import { useAsyncState } from "@vueuse/core"
import { Button, Spin, Space } from "ant-design-vue"

function mock(params: Record<string, any>) {
  console.log('params:', params)

  return new Promise<{ id: number | null; [key: string]: any }>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        userId: 1,
        completed: false,
        title: "delectus aut autem",
      })
    }, 1800)
  })
}

export default defineComponent({
  setup() {
    const { state, isLoading, execute } = useAsyncState(mock, { id: null })

    return () => (
      <Space direction="vertical">
        <Spin spinning={isLoading.value}>{JSON.stringify(state.value, null, 4)}</Spin>

        <Button type="primary" onClick={() => execute(2000, { id: 2 })}>
          Execute
        </Button>
      </Space>
    )
  },
})
