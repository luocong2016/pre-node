import { defineComponent } from "vue"
import { GithubOutlined } from "@ant-design/icons-vue"
import Footer from "@/layout/src/components/Footer"

export default defineComponent({
  setup() {
    const links = [
      {
        key: "Ant Design Pro",
        title: "Ant Design Pro",
        href: "https://pro.ant.design",
        blankTarget: true,
      },
      {
        key: "github",
        title: <GithubOutlined />,
        href: "https://github.com/ant-design/ant-design-pro",
        blankTarget: true,
      },
      {
        key: "Ant Design",
        title: "Ant Design",
        href: "https://ant.design",
        blankTarget: true,
      },
    ]
    const copyright = "@2019 蚂蚁金服体验技术部出品"

    return () => <Footer links={links} copyright={copyright} />
  },
})
