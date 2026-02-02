<template>
  <div>
    <VxeTable v-bind="$attrs" ref="table" v-on="$listeners">
    <!--
      filter-render 数据筛选，筛选渲染器配置项
      name 渲染器名称
      props 渲染器属性
    -->
    <!--
      filters 数据筛选，配置筛选条件
    -->
    <VxeColumn
      v-for="(column, index) in columns"
      v-bind="column"
      :key="`${column.field ?? column.type}_${index}`"
      :filter-render="getColumnFilterRender(column)"
      :filters="getColumnFilters(column)"
      :resizable="!!column.field && column.resizable !== false"
      :show-overflow="column.showOverflow !== false"
      :sortable="column.sortable !== false"
      :width="getColumnWidth(column)"
    >
    </VxeColumn>
    </VxeTable>
    <ElPagination
        class="tr-rich-table__pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentPageChange"
        @size-change="handlePageSizeChange"
      />
  </div>
</template>
<script>
  import { VxeColumn, VxeTable } from 'vxe-table'
  import {
    getColumnCustomValueOptions,
    getColumnFilterValueFormat,
    getColumnFilterValueType,
  } from './utils'
  import {
    getDefaultFilterCondition,
    getDefaultFilterValue,
    getDefaultFilterValues,
  } from '../table-filter'
import { BaseFilterRenderName } from './constants';
  export default{
    name:"",
    components:{
      VxeColumn,
      VxeTable,
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
    },
    data(){
      return{
        filtersMap: {},
        currentPage: 1,
        total: 0,
        pageSize: 20,
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{
      handlePageSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val

        this.$emit('size-change', val)
      },
      handleCurrentPageChange(val) {
        this.currentPage = val

        this.$emit('current-change', val)
      },
      setTotal(val) {
        this.total = val
      },
          getColumnWidth(column) {
      if (column.width) return column.width

      switch (column.type) {
        case 'selection':
        case 'checkbox':
        case 'radio': {
          return 36
        }

        default: {
          return void 0
        }
      }
    },
      getColumnFilterRender(column) {
        if (!column.field || column.filters === false) return void 0

        const { props: filterRenderProps, ...restFilterRender } = column.filterRender ?? {}

        return {
          name: BaseFilterRenderName, // 关键点，指定渲染器名称
          ...restFilterRender,
          props: {
            // 如果传递了 filters 则将 filters 作为 options
            options: getColumnCustomValueOptions(column),
            multiple: column.filterMultiple ?? true,
            ...filterRenderProps,
          },
        }
      },
      getColumnFilters(column) {
        if (!column.field || column.filters === false) return void 0

        let filters

        if (this.filtersMap[column.field]) {
          filters = this.filtersMap[column.field]
        } else {
          filters = [{ data: {} }]

          // 保证每次拿到的是同一个 filters 对象, 而不是每次都重新创建一个
          this.filtersMap[column.field] = filters
        }

        const data = filters[0].data
        // 参数设置
        data.valueType = getColumnFilterValueType(column)
        data.valueFormat = getColumnFilterValueFormat(column, data.valueType)
        // 默认值设置
        if (!data.condition) {
          data.condition = getDefaultFilterCondition(data.valueType)
        }

        if (data.value === undefined) {
          data.value = getDefaultFilterValue(data.valueType)
        }

        if (data.values === undefined) {
          data.values = getDefaultFilterValues(data.valueType)
        }

        return filters
      },
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
