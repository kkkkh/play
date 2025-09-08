<template>
  <div>
    <h3>v-permission-control 权限控制</h3>
    <PermissionControlComponent />
    <el-button v-permission-control="{ permissionCode: 'test' }">有权限</el-button>
    <el-button v-permission-control="{ permissionCode: 'no' }">无权限</el-button>
    <br/>
    <el-checkbox :value="value1" v-permission-control="{
      permissionCode: 'test', successPermissionCb:successPermissionCb1
    }">有权限（清除权限）</el-checkbox>
    <br/>
    <el-checkbox :value="value2" v-permission-control="{
      permissionCode: 'test', successPermissionCb:successPermissionCb2,isClearPermission:false
    }">有权限（不清除权限）</el-checkbox>
  </div>
</template>
<script>
import PermissionControlComponent from '@/common/PermissionControl.vue'
export default {
  name: "PermissionControl",
  components: {
    PermissionControlComponent
  },
  data () {
    return {
      permissionCode: 'test',
      value1: false,
      value2: false
    }
  },
  methods: {
    successPermissionCb1(){
      this.value1 = !this.value1
    },
    successPermissionCb2(){
      this.value2 = !this.value2
    },
  }
}
</script>
<style lang="scss" scoped></style>
