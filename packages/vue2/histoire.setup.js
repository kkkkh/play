import { defineSetupVue2 } from '@histoire/plugin-vue2'
import Vue from 'vue2'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'

// 注册 Vue 插件
// Vue.use(VueRouter)
// Vue.use(Vuex)

// 定义 setup 函数，Histoire 会调用它初始化故事环境
export const setupVue2 = defineSetupVue2(({ story, variant }) => {
  // const router = new VueRouter({
  //   mode: 'hash',
  //   routes: [
  //     { path: '/', component: { template: '<div>Home</div>' } }
  //   ],
  // })

  // const store = new Vuex.Store({
  //   state: {
  //     message: 'Hello Histoire + Vue 2'
  //   }
  // })

  // 你还可以全局注册组件
  // Vue.component('GlobalComp', YourComponent)

  return {
    // router,
    // store,
    provide: {
      key: 'valueExample',
    },
  }
})
