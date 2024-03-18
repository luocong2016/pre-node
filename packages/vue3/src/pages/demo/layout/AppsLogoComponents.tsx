import { defineComponent, ref } from "vue"
import { Switch } from "ant-design-vue"
import {
  AppsLogoComponents,
  type AppsLogoComponentsProps,
} from "@/layout/src/components/AppsLogoComponents"

export default defineComponent({
  setup() {
    const disjunctor = ref(true)
    const isGroup = ref(true)

    const appList = [
      {
        icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        title: "Ant Design",
        desc: "杭州市较知名的 UI 设计语言",
        url: "https://ant.design",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
        title: "AntV",
        desc: "蚂蚁集团全新一代数据可视化解决方案",
        url: "https://antv.vision/",
        target: "_blank",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
        title: "Pro Components",
        desc: "专业级 UI 组件库",
        url: "https://procomponents.ant.design/",
      },
      {
        icon: "https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png",
        title: "umi",
        desc: "插件化的企业级前端应用框架。",
        url: "https://umijs.org/zh-CN/docs",
      },

      {
        icon: "https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png",
        title: "qiankun",
        desc: "可能是你见过最完善的微前端解决方案🧐",
        url: "https://qiankun.umijs.org/",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
        title: "语雀",
        desc: "知识创作与分享工具",
        url: "https://www.yuque.com/",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg",
        title: "Kitchen ",
        desc: "Sketch 工具集",
        url: "https://kitchen.alipay.com/",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
        title: "dumi",
        desc: "为组件开发场景而生的文档工具",
        url: "https://d.umijs.org/zh-CN",
      },
    ]

    const AppGroupList = [
      {
        title: "UI 设计语言",
        children: [
          {
            icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
            title: "应用内跳转",
            url: "/components/page-container",
          },
          {
            icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
            title: "Ant Design",
            url: "https://ant.design",
          },
          {
            icon: () => (
              <img src="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg" />
            ),
            title: "Pro Components",
            url: "https://procomponents.ant.design/",
          },
        ],
      },
      {
        title: "UI 设计语言 2组111",
        icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
        url: "https://procomponents.ant.design/",
        children: [
          {
            icon: "W",
            title: "AntV",
            url: "https://antv.vision/",
            target: "_blank",
          },
          {
            title: "AntV",
            url: "https://antv.vision/",
            target: "_blank",
          },
        ],
      },
      {
        title: "待分组",
        children: [
          {
            title: "工具",
            icon: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
            url: "https://www.yuque.com/",
          },
          {
            title: "前端应用框架",
            icon: "https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png",
            url: "https://umijs.org/zh-CN/docs",
          },
          {
            icon: "https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png",
            title: "qiankun",
            url: "https://qiankun.umijs.org/",
          },
          {
            icon: "https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg",
            title: "Kitchen ",
            url: "https://kitchen.alipay.com/",
          },
          {
            icon: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
            title: "dumi",
            url: "https://d.umijs.org/zh-CN",
          },
        ],
      },
    ]

    // 如果添加会被拦截跳转
    const itemClick: AppsLogoComponentsProps["itemClick"] = (app) => {
      console.log(app)
    }

    return () => (
      <div>
        <div>是否组数据</div>
        <Switch v-model={[disjunctor.value, "checked"]} />

        <div>开关控制 itemClick 是否生效</div>
        <Switch v-model={[isGroup.value, "checked"]} />

        <AppsLogoComponents
          appList={isGroup.value ? AppGroupList : appList}
          itemClick={disjunctor.value ? itemClick : undefined}
        />
      </div>
    )
  },
})
