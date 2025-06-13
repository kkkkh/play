// const mode = process.env.MODE || 'vue3'
// import histoireConfigVue2 from './histoire.config.vue2.js'
// import histoireConfigVue3 from './histoire.config.vue3.js'

// export default mode === 'vue2' ? histoireConfigVue2 : histoireConfigVue3
// export default histoireConfigVue3
// const config = await import(`./histoire.config.${mode}.js`)
// export default config.default
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  outDir: './docs/vue3',
  storyMatch: [
    '**/packages/vue/src/**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  vite: {
    plugins: [
      vue(),
    ],
    base: '/play/vue3/',
  },
})
