import type { ProAliasToken } from "@/utils/makeStyle"

import { genComponentStyleHook } from "@/utils/makeStyle"

export interface SiderMenuStylishToken extends ProAliasToken {
  componentCls: string
  proLayoutCollapsedWidth: number
}

export default genComponentStyleHook("ProLayoutSiderMenuStylish", (token) => {
  if (!token.stylish) return []

  return [
    {
      [`div${token.proComponentsCls}-layout`]: {
        [`${token.componentCls}`]: token.stylish?.(token),
      },
    },
  ]
})
