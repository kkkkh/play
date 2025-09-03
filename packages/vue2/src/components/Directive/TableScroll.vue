<template>
  <div>
    <h3>v-table-scroll 表格滚动</h3>
    <el-table v-table-scroll="scroll" border :data="tableData" size="mini" :stripe="false" :max-height="300"
      style="margin-top: 20px; width: 100%; height: 300px">
      <el-table-column align="center" label="id" prop="id" width="80" />
      <el-table-column align="center" label="name" prop="name" />
      <el-table-column align="center" label="age" prop="age" width="100" />
    </el-table>
  </div>
</template>
<script>
import { Table as ElTable, TableColumn as ElTableColumn } from 'element-ui'
export default {
  name: "TableScroll",
  components: {
    ElTable,
    ElTableColumn
  },
  data () {
    return {
      scroll: false,
      tableData: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Name ${i}`,
        age: i,
      })),
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = true
    })
  }
}
</script>
