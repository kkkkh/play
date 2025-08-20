<script setup>
const components = import.meta.glob('./*/Index.vue', { eager: true, import: 'default' })
const componentsList = Object.values(components)
</script>

<template>
  <Story title="Base">
    <Variant :title="component.name" v-for="(component, key) in componentsList" :key="key">
      <component :is="component" />
    </Variant>
  </Story>
</template>
