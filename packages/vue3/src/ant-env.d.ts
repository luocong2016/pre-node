import { ComponentTokenMap as ProComponentTokenMap } from "@/layout/src/component"

declare module "ant-design-vue/es/theme/interface" {
  interface ComponentTokenMap extends ProComponentTokenMap {}
}
