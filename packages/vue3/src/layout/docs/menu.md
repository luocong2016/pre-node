# 菜单组件设计

| 参数            | 说明                                        | 类型                                                                              | 默认值  |
| --------------- | ------------------------------------------- | --------------------------------------------------------------------------------- | ------- |
| locale          | 是否 `i18n`, 需要 `formatMessage` 配合      | boolean                                                                           | `false` |
| defaultOpenAll  | 默认打开所有的菜单项                        | boolean                                                                           | `false` |
| loading         | 加载状态                                    | boolean                                                                           | `false` |
| onLoadingChange | 加载状态变化回调                            | `(loading: boolean) => void`                                                      | -       |
| request         | 远程加载菜单方法，会自动修改 `loading` 方法 | `(params: any[], defaultMenuData: RouteRecordRaw[]) => Promise<RouteRecordRaw[]>` | -       |

# 路由

```typescript
// src/vue-router.d.ts
import "vue-router"

import type { VNodeChild } from "vue"

export type VueNode = VNodeChild | JSX.Element

declare module "vue-router" {
  interface RouteMeta {
    title: string // 菜单和面包屑展示名字
    cache?: boolean // 是否缓存
    permission?: string[] // 前端控制权限时使用
    hideInMenu?: boolean // 是否隐藏菜单
    hideChildInMenu?: boolean // 是否隐藏子节点在菜单显示
    icon?: VueNode // 菜单和面包屑的 Icon
    alwaysShow?: boolean // 若只有一个子节点会直接显示子节点作为菜单和路由，false 显示级联结构

    [key: string]: any
  }
}
```
