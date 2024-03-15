import { VueNode } from "@/utils/makeStyle"

export type AppItemProps = {
  title: VueNode
  desc?: VueNode
  icon?: VueNode | (() => VueNode)
  url?: string
  target?: string
  children?: Omit<AppItemProps, "children">[]
}

export type AppListProps = AppItemProps[]
