import { defineSetupVue3 } from '@histoire/plugin-vue'
import { setupDirectives } from '@/directives'
import { setupStore } from '@/store'
import AppProvider from '@/common/AppProvider/index.vue'

export const setupVue3 = defineSetupVue3(({ app,addWrapper }) => {
  // 添加 provider
  addWrapper(AppProvider);
  // 添加 store
  setupStore(app);
  // 添加 directive
  setupDirectives(app);
})
