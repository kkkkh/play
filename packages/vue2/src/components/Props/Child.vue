<template>
  <div>
    <div><span>Name:</span> {{ form.name }}</div>
    <div><span>Age:</span> <input type="number" v-model="form.age" /></div>
    <div><span>Email:</span> <input type="email" v-model="form.email" /></div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  }
}
</script>
