<template>
  <div>
    <PermissionControl />
    <h3>v-permission-control 权限控制</h3>
    <n-button v-permission-control="{ permissionCode: 'test' }">有权限</n-button>
    <n-button v-permission-control="{ permissionCode: 'no' }">无权限</n-button>
    <br/>
    <n-checkbox :checked="value1" v-permission-control="{
      permissionCode: 'test', successPermissionCb: successPermissionCb1
    }">有权限（清除权限）</n-checkbox>
    <br/>
    <n-checkbox :checked="value2" v-permission-control="{
      permissionCode: 'test', successPermissionCb: successPermissionCb2, isClearPermission: false
    }">有权限（不清除权限）</n-checkbox>
  </div>
</template>

<script setup lang="ts">

import PermissionControl from '@/common/PermissionControl.vue'

const value1 = ref(false)
const value2 = ref(false)

function successPermissionCb1() {
  value1.value = !value1.value
}
function successPermissionCb2() {
  value2.value = !value2.value
}
</script>

<style lang="scss" scoped></style>
