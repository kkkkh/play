<script setup lang="ts">
import type { Component } from 'vue'

const components = Object.values(import.meta.glob("./*/index.vue", { eager: true, import: 'default' })) as Component[]

</script>

<template>
  <Story title="Base">
    <Variant :title="component.name" v-for="component in components" :key="component.name">
      <component :is="component" />
    </Variant>
  </Story>
</template>
