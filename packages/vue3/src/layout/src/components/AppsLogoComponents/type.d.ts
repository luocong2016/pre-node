import { VueNode } from "@/utils/makeStyle"

export type AppitemProps = {
  title: VueNode
  desc?: VueNode
  icon?: VueNode | (() => VueNode)
  url?: string
  target?: string
  children?: Omit<AppitemProps, "children">[]
}

export type AppListProps = AppitemProps[]
