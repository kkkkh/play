<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <PropsIndex />
  </div>
</template>

<script>
import PropsIndex from './components/Props/Index.vue';
export default {
  data() {
    return {
      message: "Hello Vue 2!",
    };
  },
  components: {
    PropsIndex
  },
  methods: {}
};
</script>
