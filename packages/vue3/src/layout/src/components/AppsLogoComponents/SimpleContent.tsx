import type { AppListProps, AppItemProps } from "./type"
import type { PropType } from "vue"

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

export const SimpleContent = defineComponent({
  props: {
    appList: Array as PropType<AppListProps>,
    itemClick: Function as PropType<(item: AppItemProps) => void>,
    baseClassName: String,
    hashId: String,
  },

  setup(props) {
    return () => (
      <div class={`${props.baseClassName}-content ${props.hashId}`.trim()}>
        <ul class={`${props.baseClassName}-content-list ${props.hashId}`.trim()}>
          {props.appList?.map((app, index) => {
            if (app?.children?.length) {
              return (
                <div
                  key={index}
                  class={`${props.baseClassName}-content-list-item-group ${props.hashId}`.trim()}
                >
                  <div
                    class={`${props.baseClassName}-content-list-item-group-title ${props.hashId}`.trim()}
                  >
                    {app.title}
                  </div>
                  <SimpleContent
                    hashId={props.hashId}
                    itemClick={props.itemClick}
                    appList={app?.children}
                    baseClassName={props.baseClassName}
                  />
                </div>
              )
            }

            return (
              <li
                key={index}
                class={`${props.baseClassName}-content-list-item ${props.hashId}`.trim()}
                onClick={(e) => {
                  e.stopPropagation()
                  props.itemClick?.(app)
                }}
              >
                <a
                  href={props.itemClick ? "javascript:;" : app.url}
                  target={app.target}
                  rel="noreferrer"
                >
                  <RenderLogo logo={app.icon} title={app.title} />
                  <div>
                    <div>{app.title}</div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  },
})
