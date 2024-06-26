import _ from "lodash"
import { type RouteRecordRaw } from "vue-router"

const modules = import.meta.glob(["./demo/**/*.(tsx|jsx|vue)"], { eager: true, import: "default" })

const exclude: string[] = []

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const DemoRoutes: RouteRecordRaw[] = Object.keys(modules).reduce((pre, key) => {
  if (exclude.includes(key)) return pre

  const [level, fileType] = key.replace(/^\.\//, "").split(".")
  const paths = level.split("/")

  dfs(pre, paths, fileType)

  return pre
}, [])

// vue-router 根路由必须要 /^\// 开始
DemoRoutes[0].path = "/demo"

console.log(DemoRoutes)

function dfs(arr: any[], target: string[], fileType: string, index = 0) {
  if (target.length === 0 || index > target.length - 1) return

  const fullPath = `/${target.slice(0, index + 1).join("/")}`

  let chirenItem = arr.find((o) => o.name === fullPath)

  if (!chirenItem) {
    const isLeaf = index === target.length - 1
    const component = isLeaf
      ? modules[`./${target.slice(0, index + 1).join("/")}.${fileType}`]
      : getComponent(target, index)
    // @ts-ignore
    const meta = component?.meta ?? { title: target[index] }

    chirenItem = {
      name: fullPath,
      key: fullPath,
      meta,
      path: target[index],
      label: meta?.label ?? meta?.title,
      title: meta?.title,
      redirect: isLeaf ? undefined : whetherIf(target, index),
      children: !isLeaf ? [] : undefined,
      component,
    }
    arr.push(chirenItem)

    if (
      target.length > 1 &&
      target[target.length - 1] === capitalizeFirstLetter(target[target.length - 2])
    ) {
      arr.pop()
    }
  }

  chirenItem?.children && dfs(chirenItem.children, target, fileType, index + 1)
}

function getComponent(target: any[], index: number) {
  const key = `./${target.slice(0, index + 1).join("/")}/${capitalizeFirstLetter(
    target[index]
  )}`.replace(/\/\//, "/")

  return modules[`${key}.vue`] ?? modules[`${key}.tsx`]
}

function whetherIf(target: any[], index: number) {
  if (target.length - 1 < index) return
  const str = target.slice(0, index + 1).join("/")
  if (modules[`./${str}/index.vue`] || modules["./${str}/index.tsx"]) {
    return `/${str}/index`
  }
  return whetherIf(target, index + 1)
}

export default import.meta.env.MODE === "development" ? DemoRoutes : []
