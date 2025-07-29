<template>
  <div class="big-screen">
    使用 vw 和 vh 方案
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'BigScreen',
})
</script>
<style lang="scss" scoped>
.big-screen{
  background-color: aqua;
  width: vw(600);
  height: vh(600);
}
</style>
