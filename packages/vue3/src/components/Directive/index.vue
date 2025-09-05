<template>
  <div>
    <component :is="component" v-for="component in componentsList" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineOptions({
  name: 'Directive'
})

// 自动导入当前目录下除 index.vue 外的所有组件
const modules = import.meta.glob(['./*.vue', '!./index.vue'], { eager: true, import: 'default' })
const componentsList = Object.values(modules) as Component[]
</script>
