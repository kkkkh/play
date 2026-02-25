<template>
  <div>
    <BaseTable
      v-bind="$attrs"
      ref="BaseTableRef"
      :columns="columns"
      :checkbox-config="{
        reserve: true,
      }"
      :data="currentData"
      :filter-config="{ remote: true }"
      :immediate="false"
      :sort-config="{
        remote: true,
        multiple: true,
        chronological: true
      }"
      @current-change="currentChange"
      @filter-change="filterChange"
      @size-change="sizeChange"
      @sort-change="sortChange">
    </BaseTable>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'


import BaseTable from './base-table/index.vue'
import { filterValue } from './table-filter/filters'
import { sortValue } from './table-sort'

export default {
  name: 'VxeTablePlus',
  components: { BaseTable },
  inheritAttrs: false,
  props: {
    // #region all-data
    allData: {
      type: Array, default: () => []
    },
    // #endregion all-data
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 20,
      },
      filterList: [],
      sortList: [],
    }
  },
  computed: {
    // #region pagination-data
    currentData () {
      return this.sortData.slice(
        (this.page.currentPage - 1) * this.page.pageSize,
        this.page.currentPage * this.page.pageSize
      )
    },
    // #endregion pagination-data
    total () {
      return this.fileterData.length
    },
    // #region sort-data
    sortData () {
      const data = this.fileterData

      if (this.sortList.length > 0) {
        data.sort((a, b) => {
          // 排序条件多条：依次对排序列表进行过滤
          // 比如有两个字段，一个正序，一个倒序
          // 先以第一个排序条件优先，!==0则大小已定，===0对应数值相同，则进行下一个排序条件，进行排序
          // 参考后端排序算法
          for (const list of this.sortList) {
            const res = sortValue(a, b, list)

            if (res !== 0) {
              return res
            }
          }

          return 0
        })
      }

      return data
    },
    // #endregion sort-data
    // #region filter-data
    fileterData () {
      let data = []

      data =
        this.filterList.length > 0
          ? this.filterList.reduce((pre, next) => {
            // 筛选是且关系，reduce逐层过滤
            // 过滤列表，依次对数据进行过滤
            // pre 做为过滤之后的数据返回
            // next 做为每一次的过滤条件
            return pre.filter((item) =>
              // item[next.field] 是当前行的数据
              // next.datas[0] 是第一条过滤条件
              filterValue(item[next.field], next.datas ? next.datas[0] : next)
            )
          }, this.allData)
          : this.allData

      return data
    },
    // #endregion filter-data
  },
  watch: {
    fileterData: {
      handler () {
        this.$nextTick(() => {
          this.$refs.BaseTableRef.setTotal(this.total)
        })
      },
      immediate: true,
    },
  },
  methods: {
    clearSelections () {
      this.$refs.BaseTableRef.clearSelections()
    },
    filterChange (val) {
      this.filterList = cloneDeep(val.filterList)
      console.log(val)
    },
    sortChange (val) {
      this.sortList = cloneDeep(val.sortList)
      console.log(val)
    },
    currentChange (val) {
      this.page.currentPage = val
    },
    sizeChange (val) {
      this.page.pageSize = val
    },
  },
}
</script>
