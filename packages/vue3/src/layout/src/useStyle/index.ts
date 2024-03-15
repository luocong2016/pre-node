import type { ProAliasToken } from "@/utils/makeStyle"
import type { CSSObject } from "ant-design-vue"

export const resetComponent = (token: ProAliasToken): CSSObject => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  listStyle: "none",
})
