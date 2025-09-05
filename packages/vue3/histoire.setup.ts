import { defineSetupVue3 } from '@histoire/plugin-vue'
import { setupDirectives } from '@/directives'
import { setupStore } from '@/store'
import AppProvider from '@/common/AppProvider/index.vue'
// export const setupVue3 = defineSetupVue3(({ app }) => {
//   setupDirectives(app);
//   setupStore(app);

//   return {
//     // 用 wrapper 把每个 story 包裹在 MessageProvider 中
//     wrapper: (storyComponent: any) => {
//       return h(NMessageProvider, null, {
//         default: () => storyComponent,
//       })
//     },
//   }
// })

export const setupVue3 = defineSetupVue3(({ app,addWrapper }) => {
  setupDirectives(app);
  setupStore(app);
  addWrapper(AppProvider)
})
