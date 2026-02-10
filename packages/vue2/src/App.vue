<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <!-- <DirectiveIndex /> -->
    <!-- <PropsIndex /> -->
    <!-- <ExtendIndex /> -->
    <!-- <PermissionControl /> -->
     <VxeTableCom></VxeTableCom>
  </div>
</template>

<script>
import PropsIndex from './components/Props/index.vue';
import ExtendIndex from './components/Extend/index.vue';
import DirectiveIndex from './components/Directive/index.vue';
import PermissionControl from './common/PermissionControl.vue';
import VxeTableCom from './components/VxeTable/index.vue';
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
    PermissionControl,
    VxeTableCom
  },
  methods: {}
};
</script>
