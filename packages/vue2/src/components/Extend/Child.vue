<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-for="item in data" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {
    data:{
      type:Array,
      default:()=>[]
    }
  },
  data () {
    return {
      title:'Vue.extend()'
    }
  },

}
</script>
<style lang="scss" scoped></style>
