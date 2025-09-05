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
      include: ['vueuc'],
    },
    ssr: {
      noExternal: ['naive-ui', 'vueuc'], // 确保 SSR / 构建时不会当作 CJS
    },
  },
  setupFile: './histoire.setup.ts',
})
