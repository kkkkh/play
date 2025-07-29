<script setup>

const components = Object.values(import.meta.glob("./*/Index.vue", { eager: true, import: 'default' }))

</script>

<template>
  <Story title="Base">
    <Variant :title="component.name" v-for="component in components" :key="component.name">
      <component :is="component" />
    </Variant>
  </Story>
</template>
