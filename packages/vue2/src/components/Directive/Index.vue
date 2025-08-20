<template>
  <div>
    <SortableDrag />
    <TableScroll />
  </div>
</template>
<script>
import SortableDrag from './SortableDrag.vue'
import TableScroll from './TableScroll.vue'
  export default{
    name:"Directive",
    components:{SortableDrag,TableScroll},
  }
</script>
