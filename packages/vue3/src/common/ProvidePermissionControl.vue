<template>
  <PermissionControlComponent ref="permissionControl" />
  <slot></slot>
</template>
<script lang="ts" setup>
import {
  NewPermissionControlKey,
} from '@/constants/injection'
import PermissionControlComponent from '@/common/PermissionControl.vue'
const permissionControl = ref()
const handlePermission = (
  permissionCode: string,
  successPermissionCb?: () => void,
  noPermissionHandle?: () => void,
) => {
  // 这里加上类型断言，避免 TS 报错
  permissionControl.value.show(permissionCode, successPermissionCb, noPermissionHandle)
}
provide(NewPermissionControlKey, handlePermission)
</script>
<style lang="scss" scoped></style>
