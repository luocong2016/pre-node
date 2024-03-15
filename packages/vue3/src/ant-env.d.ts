// import { ComponentTokenMap as AntComponentTokenMap } from "ant-design-vue/es/theme/interface/components"

import { GlobalFooterToken } from "@/layout/src/components/GlobalFooter/style"

declare module "ant-design-vue/es/theme/interface" {
  interface ComponentTokenMap {
    ProLayoutGlobalFooter?: GlobalFooterToken
  }
}
