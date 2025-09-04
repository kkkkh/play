<script setup lang="ts">
import type { Component } from 'vue'

const components = Object.values(import.meta.glob('./components/**/Index.vue', {
  eager: true,
  import: 'default'
})) as Component[]

const componentName = [
  'BigScreen',
  // 'Props'
]

const viewComponents = components.filter(component => {
  return componentName.includes(component?.name!)
})
// console.log(viewComponents)
</script>

<template>
  <div v-for="component in viewComponents" :key="component.name">
    <component :is="component" />
  </div>
</template>

<style scoped>

</style>
