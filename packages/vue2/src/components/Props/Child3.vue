<template>
  <form @submit.prevent>
    <div><span>Name:</span> {{ formValue.name }}</div>
    <div><span>Age:</span> <input type="number" v-model="formValue.age" /></div>
    <div><span>Email:</span> <input type="email" v-model="formValue.email" /></div>
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
    return {}
  },
  computed: {
    formValue: {
      get() {
        return this.form
      },
    }
  },
  watch: {
    // 父组件的 form 更新，自动同步本地数据
    formValue: {
      handler(newVal) {
        this.$emit('update:form', newVal)
      },
      deep: true
    }
  }
}
</script>
