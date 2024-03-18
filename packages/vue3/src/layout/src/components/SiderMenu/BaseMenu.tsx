import type { FunctionalComponent } from "vue"
import type { VueNode } from "../../typing"

import { defineComponent, watch } from "vue"
import { createFromIconfontCN } from "@ant-design/icons-vue"
import { Tooltip } from "ant-design-vue"
import { useBoolean } from "../hooks"
import { defaultSettings } from "../../defaultSettings"
import { isUrl, isImg } from "@/utils/is"

// todo
export type MenuMode = "vertical" | "vertical-left" | "vertical-right" | "horizontal" | "inline"

const MenuItemTooltip = defineComponent({
  props: {
    title: String,
    collapsed: Boolean,
    disable: Boolean,
  },

  setup(props, { slots }) {
    const [collapsed, { set: setCollapsed }] = useBoolean(props.collapsed)
    const [open, { set: setOpen }] = useBoolean(false)

    watch(
      () => props.collapsed,
      () => {
        setOpen(false)
        setTimeout(() => {
          setCollapsed(props.collapsed)
        }, 400)
      }
      // {
      //   immediate: true,
      // }
    )

    return () => {
      if (props.disable) {
        return slots.default?.()
      }
      return (
        <Tooltip
          title={props.title}
          open={collapsed.value && props.collapsed ? open.value : false}
          placement="right"
          onOpenChange={setOpen}
        >
          {slots.default?.()}
        </Tooltip>
      )
    }
  },
})

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
})

// icon: [String, Function],
// iconPrefixes: {
//   type: String,
//   default: "icon-",
// },

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon: FunctionalComponent<{
  icon: VueNode
  iconPrefixes: string
}> = ({ icon, iconPrefixes = "icon-" }) => {
  return () => {
    if (typeof icon === "string" && icon !== "") {
      if (isUrl(icon) || isImg(icon)) {
        return <img width={16} key={icon} src={icon} alt="icon" />
      }
      if (icon.startsWith(iconPrefixes)) {
        return <IconFont type={icon} />
      }
    }
    return icon
  }
}

const getMenuTitleSymbol: FunctionalComponent<{ title: VueNode }> = ({ title }) => {
  if (title && typeof title === "string") {
    const symbol = title.substring(0, 1).toUpperCase()
    return symbol
  }
  return null
}
