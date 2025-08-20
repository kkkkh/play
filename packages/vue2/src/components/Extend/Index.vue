<template>
  <div class="extend-index">
    <div id="extend"></div>
    <div ref="extendElement"></div>
  </div>
</template>
<script>
import Child from './Child.vue'
import Vue from 'vue'
export default {
  name: "Extend",
  components: {},
  data () {
    return {
    }
  },
  created () {},
  mounted () {
    this.extendHandler()
  },
  methods: {
    extendHandler () {
      // 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
      const ExtendChild = Vue.extend(Child)
      const extendInstance = new ExtendChild({
        propsData: {
          data: [
            { id: 1, name: 'Vue.extend() 1' },
            { id: 2, name: 'Vue.extend() 2' },
            { id: 3, name: 'Vue.extend() 3' },
          ]
      }
      })
      extendInstance.$mount('#extend')
      this.$refs.extendElement.textContent  = extendInstance.$el.innerHTML
      return extendInstance.$el
    }
  }
}
</script>
<style lang="scss" scoped></style>
