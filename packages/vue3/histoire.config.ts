import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
// import vue from '@vitejs/plugin-vue'
import viteConfig from './vite.config.ts'

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
    plugins: [
      // vue(),
    ],
    base: '/play/vue3/',
    optimizeDeps: {
      include: ['vueuc','date-fns-tz'],
    },
    // ssr: {
    //   noExternal: ['naive-ui', 'vueuc', 'date-fns-tz'], // 确保 SSR / 构建时不会当作 CJS
    // },
    // resolve: {
    //   alias: {
    //     'date-fns-tz/dist/esm': 'date-fns-tz/dist/esm/index.js',
    //   },
    // },
  },
  setupFile: './histoire.setup.ts',
})
