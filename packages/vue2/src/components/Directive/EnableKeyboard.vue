<template>
  <div>
    <h3>v-enable-keyboard 启用键盘</h3>
    <el-input v-model="value" v-enable-keyboard="enable"></el-input>
    <el-switch v-model="enable" :active-value="true" :inactive-value="false" active-text="启用键盘" inactive-text="禁用键盘"></el-switch>
  </div>
</template>
<script>
  export default{
    name:"EnableKeyboard",
    components:{},
    data(){
      return{
        value:'',
        enable:false
      }
    },
    created(){},
    mounted(){
      
    },
    methods:{
      handleEnableKeyboard(){
        this.enable = true
      },
      handleDisableKeyboard(){
        this.enable = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
