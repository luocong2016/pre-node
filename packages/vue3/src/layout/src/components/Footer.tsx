import type { VueNode } from "../typing"
import type { PropType } from "vue"

import { defineComponent } from "vue"
import { Layout } from "ant-design-vue"
import { CopyrightOutlined } from "@ant-design/icons-vue"
import GlobalFooter from "./GlobalFooter"

const { Footer } = Layout

const footerProps = {
  prefixCls: String,
  copyright: String,
  links: Array as PropType<
    {
      key?: string
      title: VueNode
      href: string
      blankTarget?: boolean
    }[]
  >,
}

export default defineComponent({
  props: footerProps,

  setup(props, { slots }) {
    return () => (
      <Footer style={{ padding: 0 }}>
        <GlobalFooter
          prefixCls={props.prefixCls}
          links={props.links}
          v-slots={{
            copyright: () =>
              props.copyright || slots.copyright ? (
                <>
                  <CopyrightOutlined /> {slots.copyright?.() ?? props.copyright}
                </>
              ) : null,
          }}
        />
      </Footer>
    )
  },
})
