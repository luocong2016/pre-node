import type { AppListProps, AppItemProps } from "./type"
import type { PropType } from "vue"

import { defineComponent } from "vue"
import { DefaultRenderLogo } from "."

export const DefaultContent = defineComponent({
  props: {
    appList: Array as PropType<AppListProps>,
    baseClassName: String,
    hashId: String,
    itemClick: Function as PropType<(item: AppItemProps) => void>,
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

                  <DefaultContent
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
                  <DefaultRenderLogo logo={app.icon} />
                  <div>
                    <div>{app.title}</div>
                    {app.desc ? <span>{app.desc}</span> : null}
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
