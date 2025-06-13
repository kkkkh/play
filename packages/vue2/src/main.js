// main.js
import Vue from 'vue'               // 引入 Vue 核心库
import App from './App.vue'         // 引入根组件

// 关闭生产环境提示
Vue.config.productionTip = false

// 创建 Vue 实例，挂载到 #app 元素
new Vue({
  render: h => h(App)    // 渲染根组件
}).$mount('#app')
