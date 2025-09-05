<script setup lang="ts">
import type { Component } from 'vue'
// import ProvidePermissionControl from '@/common/ProvidePermissionControl.vue'
import AppProvider from '@/common/AppProvider/index.vue'
const components = Object.values(import.meta.glob('./components/**/index.vue', {
  eager: true,
  import: 'default'
})) as Component[]

const componentName = [
  // 'BigScreen',
  'Directive',
  // 'Props'
]

const viewComponents = components.filter(component => {
  return componentName.includes(component?.name!)
})
// console.log(viewComponents)
</script>

<template>
  <AppProvider>
    <!-- <ProvidePermissionControl> -->
      <div v-for="component in viewComponents" :key="component.name">
        <component :is="component" />
      </div>
    <!-- </ProvidePermissionControl> -->
  </AppProvider>
</template>

<style scoped></style>
