import type { GenerateStyle, ProAliasToken } from "@/utils/makeStyle"

import { genComponentStyleHook } from "@/utils/makeStyle"

export interface StylishToken extends ProAliasToken {
  componentCls: string
  stylish?: GenerateStyle<StylishToken>
  proLayoutCollapsedWidth: number
}

export default genComponentStyleHook<any>("ProLayoutGlobalFooter", (token) => {
  console.log("token.stylish:", token)

  if (token.stylish) return []

  return [
    {
      [`div${token.proComponentsCls}-layout`]: {
        [`${token.stylishToken.componentCls}`]: token.stylish?.(token.stylishToken),
      },
    },
  ]
})
