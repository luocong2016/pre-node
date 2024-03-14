<template>
  <div>
    <Menu
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
      @click="handleMenuClick"
    />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash"
import { ref } from "vue"
import { RouterView, useRouter } from "vue-router"
import { Menu, type MenuProps } from "ant-design-vue"

import { DemoRoutes } from "../demo"

const current = ref<string[]>([])

// 需要删除 component 否则会报错
const source = _.cloneDeep(DemoRoutes[0].children)!
function dfs(arr: any[]) {
  arr.forEach((o) => {
    Reflect.deleteProperty(o, "component")
    o.children?.length && dfs(o.children)
  })
}
dfs(source)

const items = ref<MenuProps["items"]>(source as any)

const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
  router.push(key as string)
}

const router = useRouter()
</script>

<style lang="less" scoped>
:deep(.g6-tooltip) {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}

.g6-card {
  display: flex;
  flex-direction: column;
}

.container {
  padding: 15px;
}
</style>
