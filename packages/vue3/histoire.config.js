import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
// import vue from '@vitejs/plugin-vue'

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
  },
})
