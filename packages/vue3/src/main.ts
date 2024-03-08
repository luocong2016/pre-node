// import "default-passive-events"

import { createApp } from "vue"
import "ant-design-vue/dist/reset.css"
import "./style.css"

import App from "./App"

import router from "./router"

const app = createApp(App)
app.use(router)
app.mount("#app")
