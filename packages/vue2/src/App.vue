<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <!-- <PropsIndex /> -->
    <ExtendIndex />
  </div>
</template>

<script>
import PropsIndex from './components/Props/Index.vue';
import ExtendIndex from './components/Extend/Index.vue';
export default {
  data() {
    return {
      message: "Hello Vue 2!",
    };
  },
  components: {
    PropsIndex,
    ExtendIndex,
  },
  methods: {}
};
</script>
