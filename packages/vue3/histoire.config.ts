import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  outDir: '../../docs/vue3',
  storyMatch: [
    '**/src/**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  vite: {
    base: '/play/vue3/',
    // optimizeDeps: {
    //   include: ['vueuc','date-fns-tz'], // 不起作用
    // },
    ssr: {
      // 因为引入ui组件，naive-ui在histoire build 的时候报错
      // vueuc 和 date-fns-tz 都是按照commonjs 加载了
      // 这里要错一层处理
      noExternal: ['naive-ui', 'vueuc', 'date-fns-tz'], // 确保 SSR / 构建时不会当作 CJS 起作用
    },
    // resolve: {
    //   alias: {
    //     'date-fns-tz/dist/esm': 'date-fns-tz/dist/esm/index.js', // 不起作用
    //   },
    // },
  },
  setupFile: './histoire.setup.ts',
})
