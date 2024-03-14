import { defineComponent } from "vue"
import { useConfigInject, classNames } from "@/utils/makeStyle"
import useStyle from "./style"

const globalHeaderProps = {
  prefixCls: String,
}

export default defineComponent({
  props: globalHeaderProps,

  setup(props) {
    const { prefixCls, direction } = useConfigInject(
      props.prefixCls || "pro-layout-global-header",
      props
    )
    const { wrapSSR, hashId } = useStyle(prefixCls)

    const baseClassName = prefixCls.value

    const logoClassNames = classNames(`${baseClassName}-logo`, hashId, {
      [`${baseClassName}-logo-rtl`]: direction.value === "rtl",
      [`${baseClassName}-logo-mix`]: layout === "mix",
      [`${baseClassName}-logo-mobile`]: isMobile,
    })

    return () => wrapSSR(<div></div>)
  },
})
