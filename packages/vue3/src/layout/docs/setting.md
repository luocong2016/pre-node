# 布局设置

```typescript
interface Settings {
  title: string // 项目名称
  iconfontUrl?: string // 项目logo
  siderWidth?: number // 侧边菜单宽度,默认：208
  colorPrimary?: string // 主色系
  fixedHeader?: boolean // 固定头部
  fixSiderbar?: boolean // 固定菜单导航
  contentWidth: "Fluid" | "Fixed"
  layout: "side" | "top"
}
```
