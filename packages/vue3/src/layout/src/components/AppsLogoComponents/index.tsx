import type { AppitemProps, AppListProps } from "./type"
import type { PropType } from "vue"

import { defineComponent, ref } from "vue"
import { DefaultContent } from "./DefaultContent"

import useStyle from "./style"

export const defaultRenderLogo = defineComponent({
  props: {
    logo: [String, Function],
  },

  setup(props) {
    return () => {
      if (typeof props.logo === "string") {
        return <img width="auto" height={22} src={props.logo} alt="logo" />
      }

      if (typeof props.logo === "function") {
        return props.logo()
      }

      return props.logo
    }
  },
})

export const AppsLogoComponents = defineComponent({
  props: {
    appList: Array as PropType<AppListProps>,
    prefixCls: String,
  },

  setup() {
    return () => <>22</>
  },
})
