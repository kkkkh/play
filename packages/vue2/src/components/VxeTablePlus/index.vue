<template>
  <div>
    <vxe-table-plus :columns="columns" :all-data="allData" :row-config="{keyField: 'id'}" ></vxe-table-plus>
  </div>
</template>
<script>
  export default{
    name:"VxeTablePlusDemo",
    data(){
      return{
        columns: [
          { field: 'name', title: 'Name', filters: true,sortable: true },
          { field: 'age', title: 'Age', filters: true,sortable: true },
          { field: 'date', title: 'Date', filters: true,sortable: true, params:{dataType: 'date'} },
          // { field: 'time', title: 'Time', filters: true,sortable: true, dataType: 'time' },
          // { field: 'datetime', title: 'Datetime', filters: true,sortable: true, dataType: 'datetime' },
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
        age: i + 1,
        date: '2026-02-03',
        time: new Date(),
        datetime: new Date(),
      }))
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
