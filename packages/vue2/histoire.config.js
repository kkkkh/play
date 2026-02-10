import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue2'
import path from 'path'
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
    server: {
      fs: {
        // strict: false,
        allow: [
          // 允许 workspace 根
          path.resolve(__dirname, '../../'),
          // 或者直接允许当前 package + 仓库根 node_modules
          path.resolve(__dirname, './'),
          path.resolve(__dirname, '../../node_modules'),
        ],
      }
    }
  },
  setupFile: './histoire.setup.js',
})
