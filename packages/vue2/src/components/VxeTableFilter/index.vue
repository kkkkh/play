<template>
  <div>
    <vxe-table-filter :columns="columns" :all-data="allData"></vxe-table-filter>
  </div>
</template>
<script>
  import VxeTableFilter from '@/plugin/vxe-table/index.vue'
  export default{
    name:"VxeTableFilterRernder",
    components:{VxeTableFilter},
    data(){
      return{
        columns: [
          { field: 'name', title: 'Name', filters: true,sortable: true },
          { field: 'age', title: 'Age', filters: true,sortable: true },
        ],
        allData: [
        ]
      }
    },
    created(){},
    mounted(){
      // 模拟生成500条数据
      this.allData = Array.from({ length: 500 }, (v, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + (i % 30),
      }))
    },
    methods:{
      
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
