import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue2'
export default defineConfig({
  plugins: [
    HstVue(),
  ],
  outDir: '../../docs/vue2',
  storyMatch: [
    '**/src/**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  vite: {
    base: '/play/vue2/',
  },
  setupFile: './histoire.setup.js',
})
