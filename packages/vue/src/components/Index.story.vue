<script setup>
import PropsIndex from './Props/Index.vue'
// import PropsChild from './Props/Child.vue'
</script>

<template>
  <Story title="Base">
    <Variant title="Props">
      <PropsIndex />
    </Variant>
    <!-- <Variant title="Child">
      <PropsChild :form="{}" />
    </Variant> -->
  </Story>
</template>
