// main.js
import Vue from 'vue'               // 引入 Vue 核心库
import App from './App.vue'         // 引入根组件
import 'element-ui/lib/theme-chalk/index.css'
import 'vxe-table/lib/style.css'
import '@/directives'
import store from '@/store'
import EventBus from '@/utils/eventBus'
import VXETable from './plugin/vxe-table'

// 关闭生产环境提示
Vue.config.productionTip = false
Vue.prototype.$EventBus = EventBus

// 创建 Vue 实例，挂载到 #app 元素
new Vue({
  store,
  render: h => h(App)    // 渲染根组件
}).$mount('#app')
