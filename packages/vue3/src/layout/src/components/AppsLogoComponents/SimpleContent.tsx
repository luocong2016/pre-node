import type { AppItemProps, AppListProps } from "./type"

import { defineComponent } from "vue"
import { isUrl } from "@/utils/is"

export const RenderLogo = defineComponent({
  props: {
    logo: [String, Function],
    title: [String, Function],
  },
  setup(props) {
    return () => {
      if (props.logo && typeof props.logo === "string" && isUrl(props.logo)) {
        return <img src={props.logo} alt="logo" />
      }

      if (typeof props.logo === "function") {
        return props.logo()
      }

      if (props.logo && typeof props.logo === "string") {
        return <div id="avatarLogo">{props.logo}</div>
      }

      if (!props.logo && props.title && typeof props.title === "string") {
        const symbol = props.title.substring(0, 1)
        return <div id="avatarLogo">{symbol}</div>
      }

      return props.logo
    }
  },
})

export default defineComponent({
  setup() {
    return () => <div></div>
  },
})
