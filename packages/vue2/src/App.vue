<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <DirectiveIndex />
    <!-- <PropsIndex /> -->
    <!-- <ExtendIndex /> -->
  </div>
</template>

<script>
import PropsIndex from './components/Props/Index.vue';
import ExtendIndex from './components/Extend/Index.vue';
import DirectiveIndex from './components/Directive/Index.vue';
export default {
  data() {
    return {
      message: "Hello Vue 2!",
    };
  },
  components: {
    PropsIndex,
    ExtendIndex,
    DirectiveIndex,
  },
  methods: {}
};
</script>
