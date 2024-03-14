import type { PropType } from "vue"
import type { VueNode } from "../../typing"

import { defineComponent } from "vue"
import { useConfigInject, classNames } from "@/utils/makeStyle"

import useStyle from "./style"

const globalFooterProps = {
  prefixCls: String,
  links: Array as PropType<
    {
      key?: string
      title: VueNode
      href: string
      blankTarget?: boolean
    }[]
  >,
  copyright: String,
}

export default defineComponent({
  props: globalFooterProps,

  setup(props, { slots }) {
    const { prefixCls } = useConfigInject(props.prefixCls || "pro-layout-global-footer", props)
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const cls = classNames(prefixCls.value, {
      [hashId.value]: true,
    })

    return () => {
      if (!props.links?.length && !(props.copyright || slots.copyright)) {
        return null
      }

      return wrapSSR(
        <div class={[cls]}>
          {props.links && (
            <div class={`${prefixCls.value}-list ${hashId.value}`.trim()}>
              {props.links.map((link) => (
                <a
                  rel="noreferrer"
                  class={`${prefixCls.value}-list-link ${hashId.value}`.trim()}
                  key={link.key}
                  title={link.key}
                  target={link.blankTarget ? "_blank" : "_self"}
                  href={link.href}
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
          {(props.copyright || slots.copyright) && (
            <div class={`${prefixCls.value}-copyright ${hashId.value}`.trim()}>
              {slots.copyright?.() ?? props.copyright}
            </div>
          )}
        </div>
      )
    }
  },
})
