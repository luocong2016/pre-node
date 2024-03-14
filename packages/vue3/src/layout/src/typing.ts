import type { VNodeChild } from "vue"

export type VueNode = VNodeChild | JSX.Element

export type WithFalse<T> = T | false

export interface StaticContext {
  statusCode?: number | undefined
}

export interface mach<Params extends { [K in keyof Params]?: string } = Record<string, any>> {
  params: Params
  isExact: boolean
  path: string
  url: string
}

export type LinkProps = {
  to: string
  replace?: boolean
}
