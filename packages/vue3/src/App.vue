<script setup>
const components = Object.values(import.meta.glob('./components/**/Index.vue', {
  eager: true,
  import: 'default'
}))
console.log(components)
const viewComponents = components.filter(component => {
  return component.name.includes('BigScreen')
})
console.log(viewComponents)
</script>

<template>
  <div v-for="component in viewComponents" :key="component.name">
    <component :is="component" />
  </div>
</template>

<style scoped>

</style>
