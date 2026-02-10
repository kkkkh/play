import { defineSetupVue2 } from '@histoire/plugin-vue2'
// 给histoire 中的vue2添加全局样式 以及 其他全局配置
import 'element-ui/lib/theme-chalk/index.css'
import 'vxe-table/lib/style.css'
import '@/directives/index'
import store from '@/store'
import EventBus from '@/utils/eventBus'
import Vue from 'vue'
import VxeTablePlus from '@/plugin/vxe-table-plus'
import VxeTable from 'vxe-table'

Vue.use(VxeTablePlus)
Vue.use(VxeTable)
Vue.prototype.$EventBus = EventBus

export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  return {
    store,
  }
})
