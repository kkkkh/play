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
      :sort-config="{ remote: true, multiple: true, chronological: true }"
      @current-change="currentChange"
      @filter-change="filterChange"
      @size-change="sizeChange"
      @sort-change="sortChange"
    >
    </BaseTable>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'


import BaseTable from './base-table/index.vue'
import { filterValue } from './table-filter/filters'
import { sortValue } from './table-sort'

export default {
  name: 'VxeTableFilter',
  components: { BaseTable },
  inheritAttrs: false,
  props: {
    allData: { type: Array, default: () => [] },columns: { type: Array, default: () => [] } },
  data() {
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
    currentData() {
      return this.sortData.slice(
        (this.page.currentPage - 1) * this.page.pageSize,
        this.page.currentPage * this.page.pageSize
      )
    },
    total() {
      return this.fileterData.length
    },
    sortData() {
      const data = this.fileterData

      if (this.sortList.length > 0) {
        data.sort((a, b) => {
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
    fileterData() {
      let data = []

      data =
        this.filterList.length > 0
          ? this.filterList.reduce((pre, next) => {
              return pre.filter((item) =>
                filterValue(item[next.field], next.datas ? next.datas[0] : next)
              )
            }, this.allData)
          : this.allData

      return data
    },
  },
  watch: {
    fileterData: {
      handler() {
        this.$nextTick(() => {
          this.$refs.BaseTableRef.setTotal(this.total)
        })
      },
      immediate: true,
    },
  },
  methods: {
    clearSelections() {
      this.$refs.BaseTableRef.clearSelections()
    },
    filterChange(val) {
      this.filterList = cloneDeep(val.filterList)
      console.log(val)
    },
    sortChange(val) {
      this.sortList = cloneDeep(val.sortList)
      console.log(val)
    },
    currentChange(val) {
      this.page.currentPage = val
    },
    sizeChange(val) {
      this.page.pageSize = val
    },
  },
}
</script>
