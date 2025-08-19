<script setup>
// import PropsIndex from './Props/Index.vue'
// import ExtendIndex from './Extend/Index.vue'

const components = import.meta.glob('./*/Index.vue', { eager: true, import: 'default' })
const componentsList = Object.values(components)
console.log(componentsList)
</script>

<template>
  <Story title="Base">
    <Variant :title="component.name" v-for="(component, key) in componentsList" :key="key">
      <component :is="component" />
    </Variant>
  </Story>
</template>
