<template>
  <form @submit.prevent>
    <div><span>Name:</span> {{ localForm.name }}</div>
    <div><span>Age:</span> <input type="number" v-model="localForm.age" @change="emitUpdate"/></div>
    <div><span>Email:</span> <input type="email" v-model="localForm.email" @change="emitUpdate" /></div>
    <button @click="emitUpdate">提交</button>
  </form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 创建 form 的局部副本，避免直接修改 prop
      localForm: { ...this.form }
    }
  },
  watch: {
    // 父组件的 form 更新，自动同步本地数据
    form: {
      handler(newVal) {
        this.localForm = { ...newVal }
      },
      deep: true
    },
  },
  methods: {
    emitUpdate() {
      this.$emit('update:form', this.localForm)
    }
  }
}
</script>
