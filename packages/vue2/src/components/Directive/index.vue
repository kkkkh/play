<template>
  <div>
    <component :is="component" v-for="component in componentsList" :key="component.name" />
  </div>
</template>
<script>
const components = import.meta.glob(['./*.vue','!./index.vue'],{eager:true,import:'default'})
const componentsList = Object.values(components)
export default{
  name:"Directive",
  data(){
    return{
      componentsList,
    }
  }
}
</script>
