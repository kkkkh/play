import { defineSetupVue2 } from '@histoire/plugin-vue2'
// 给histoire 中的vue2添加全局样式 以及 其他全局配置
import 'element-ui/lib/theme-chalk/index.css'
import 'vxe-table/lib/style.css'
import '@/directives/index'
import store from '@/store'
import EventBus from '@/utils/eventBus'
import ElementUI from 'element-ui'
import Vue from 'vue'

Vue.use(ElementUI, {
  size: 'mini',
})
Vue.prototype.$EventBus = EventBus


// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

export const setupVue2 = defineSetupVue2(({ story, variant }) => {
//   // const router = new VueRouter({
//   //   mode: 'hash',
//   //   routes: [
//   //     { path: '/', component: { template: '<div>Home</div>' } }
//   //   ],
//   // })

//   // 你还可以全局注册组件
//   // Vue.component('GlobalComp', YourComponent)
  return {
    // router,
    store,
  }
})
