import type { GlobalFooterToken } from "@/layout/src/components/GlobalFooter/style"
import type { ProAppsLogoComponents } from "@/layout/src/components/AppsLogoComponents/style"
import type { ProLayoutBaseMenuToken } from "@/layout/src/components/SiderMenu/style/menu"
import type { SiderMenuStylishToken } from "@/layout/src/component/SiderMenu/style/menu"
import type { SiderMenuToken } from "@/layout/src/component/SiderMenu/style"

export interface ComponentTokenMap {
  ProLayoutGlobalFooter?: GlobalFooterToken
  ProAppsLogoComponents
  ProLayoutBaseMenu: ProLayoutBaseMenuToken
  ProLayoutSiderMenuStylish: SiderMenuStylishToken
  ProLayouSiderMenu: SiderMenuToken
}
