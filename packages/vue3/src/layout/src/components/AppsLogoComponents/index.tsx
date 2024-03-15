import type { AppItemProps, AppListProps } from "./type"
import type { PropType, Ref, ExtractPropTypes } from "vue"

import { defineComponent, ref, computed } from "vue"
import { Popover } from "ant-design-vue"
import { classNames } from "@/utils/makeStyle"
import { DefaultContent } from "./DefaultContent"
import { SimpleContent } from "./SimpleContent"
import { useBoolean } from "../hooks"
import AppsLogo from "./AppsLogo"
import useStyle from "./style"

export const DefaultRenderLogo = defineComponent({
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

const appsLogoComponentsProps = {
  appList: Array as PropType<AppListProps>,
  prefixCls: {
    type: String,
    default: "ant-pro",
  },
  itemClick: Function as PropType<
    (item: AppItemProps, popoverRef?: Ref<HTMLSpanElement | undefined>) => void
  >,
}

export type AppsLogoComponentsProps = ExtractPropTypes<typeof appsLogoComponentsProps>

export const AppsLogoComponents = defineComponent({
  props: appsLogoComponentsProps,

  setup(props, { slots }) {
    const containerRef = ref<HTMLDivElement>()
    const popoverRef = ref<HTMLSpanElement>()
    const baseClassName = computed(() => `${props.prefixCls}-layout-apps`)
    const [wrapSSR, hashId] = useStyle(baseClassName)

    const [open] = useBoolean(false)

    const cloneItemClick = (app: AppItemProps) => {
      props.itemClick?.(app, popoverRef)
    }

    const isSimple = computed(() => props.appList?.some((app) => !app?.desc))
    const DefaultDomContent = () => (
      <>
        {isSimple.value ? (
          <SimpleContent
            hashId={hashId.value}
            appList={props.appList}
            itemClick={props.itemClick ? cloneItemClick : undefined}
            baseClassName={`${baseClassName.value}-simple`}
          />
        ) : (
          <DefaultContent
            hashId={hashId.value}
            appList={props.appList}
            itemClick={props.itemClick ? cloneItemClick : undefined}
            baseClassName={`${baseClassName.value}-default`}
          />
        )}
      </>
    )

    const popoverContent = () => {
      return slots.appList?.(props.appList, DefaultDomContent) ?? <DefaultDomContent />
    }

    return () => {
      if (!props?.appList?.length) return null

      return wrapSSR(
        <div
          ref={containerRef}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <Popover
            v-model={[open.value, "open"]}
            placement="bottomRight"
            trigger={["click"]}
            z-index={9999}
            overlayClassName={`${baseClassName.value}-popover ${hashId.value}`.trim()}
            getPopupContainer={() => containerRef.value || document.body}
            v-slots={{ content: popoverContent }}
          >
            <span
              ref={popoverRef}
              onClick={(e) => {
                e.stopPropagation()
              }}
              class={classNames(`${baseClassName.value}-icon`, hashId.value, {
                [`${baseClassName.value}-icon-active`]: open.value,
              })}
            >
              <AppsLogo />
            </span>
          </Popover>
        </div>
      )
    }
  },
})
