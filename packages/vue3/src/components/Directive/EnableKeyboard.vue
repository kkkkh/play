<template>
  <div>
    <h3>v-enable-keyboard 启用键盘</h3>
    <n-input v-model:value="value" v-enable-keyboard="enable"></n-input>
    <n-switch v-model:value="enable">
      <template #checked>
        启用键盘
      </template>
      <template #unchecked>
        禁用键盘
      </template>
    </n-switch>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({
    name: 'EnableKeyboard'
  })
  import { ref } from 'vue'
  const value = ref('')
  const enable = ref(false)
</script>
<style lang="scss" scoped>

</style>
