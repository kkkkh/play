import { defineSetupVue3 } from '@histoire/plugin-vue'
import { setupDirectives } from '@/directives'
import { setupStore } from '@/store'
import AppProvider from '@/common/AppProvider/index.vue'

export const setupVue3 = defineSetupVue3(({ app,addWrapper }) => {
  setupDirectives(app);
  setupStore(app);
  addWrapper(AppProvider)
})
