<template>
  <div>
    <h3>v-sortable-drag 拖拽表头排序</h3>
    <vxe-table
      ref="xTable"
      v-sortable-drag
      border
      :checkbox-config="{ reserve: true }"
      :data="tableData"
      :max-height="300"
      :row-config="{ keyField: 'id', isCurrent: true, isHover: true }"
      style="width: 100%"
    >
      <vxe-table-column
        v-for="item in columns"
        :key="item.field"
        :field="item.field"
        :min-width="item.width"
        :title="item.title"
      />
    </vxe-table>
  </div>
</template>
<script>
import { VxeTable,VxeColumn as VxeTableColumn } from 'vxe-table'
  export default{
    name:"SortableDrag",
    components:{
      VxeTable,
      VxeTableColumn},
    data(){
      return{
        tableData:Array.from({length:100},(_,i)=>({
          id:i,
          name:`Name ${i}`,
          age:i,
        })),
        columns:[{
          field:"id",
          title:"ID",
          width:100,
        },{
          field:"name",
          title:"Name",
          width:100,
        },{
          field:"age",
          title:"Age",
          width:100,
        }],
      }
    },
  }
</script>
<style lang="scss" scoped></style>
