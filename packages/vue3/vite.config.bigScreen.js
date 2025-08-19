import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // css.preprocessorOptions[extension].additionalData
        // 该选项可以用来为每一段样式内容添加额外的代码。
        // 但是要注意，如果你添加的是实际的样式而不仅仅是变量，那这些样式在最终的产物中会重复。
        additionalData: `@use "@/assets/styles/index.scss" as *;`,
      },
    },
  }
})
