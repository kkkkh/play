<script setup>
import Child from './Child.vue'
import { reactive } from 'vue'

const form = reactive({
  name: '1',
  age: 0,
  email: '2',
  address: '3',
})

defineOptions({
  name: 'Props',
})

</script>

<template>
  <div>
    <div><span>Name:</span> <input type="text" v-model="form.name" class="form-input" /></div>
    <div><span>Age:</span> {{ form.age }}</div>
    <div><span>Email:</span> {{ form.email }}</div>
    <div><span>Address:</span> {{ form.address }}</div>
    <div style="text-align: left; margin-top: 20px;">child</div>
    <Child :form="form" />
  </div>
</template>
<style>
.form-input {
  border: 1px solid #303030;
}
</style>
