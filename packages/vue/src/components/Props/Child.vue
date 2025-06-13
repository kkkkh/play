<script setup>
import { reactive } from 'vue'
const props = defineProps({
  form: Object,
})
// v-model 绑定 ref(props.form) 或直接props.form（实际使用都可以）
const formRef = reactive(props.form)
</script>
<template>
  <div>
    <div><span>Name:</span> {{ formRef.name }}</div>
    <div><span>Age:</span> <input class="form-input" type="number" v-model="formRef.age" /></div>
    <div><span>Email:</span> <input class="form-input" type="email" v-model="formRef.email" /></div>
  </div>
</template>

