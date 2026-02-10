<script setup lang="ts">
import type { Component } from 'vue'

const components = Object.values(import.meta.glob("./*/index.vue", { eager: true, import: 'default' })) as Component[]

</script>

<template>
  <Story title="Base">
    <Variant :id="component.name" :title="component.name" v-for="(component,index) in components" :key="index">
      <component :is="component" />
    </Variant>
  </Story>
</template>
