import { defineConfig } from "vite"
import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: true,
    proxy: {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
    }),
  ],
})
