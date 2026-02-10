<template>
  <div class="table-filter">
    <div>
      <BaseFilter
        ref="filter"
        :condition.sync="option.data.condition"
        :exclude-conditions="getExcludeConditions"
        :include-conditions="getIncludeConditions"
        :is-custom-options="isCustomOptions"
        :multiple="multiple"
        size="mini"
        :value.sync="option.data.value"
        :value-format="option.data.valueFormat"
        :value-options="valueOptions"
        :value-type="option.data.valueType"
        :values.sync="option.data.values"
      />
    </div>

    <div>
      <ElButton size="mini" type="primary" @click="handleFilter">
        筛选
      </ElButton>
      <ElButton size="mini" @click="handleReset">
        重置
      </ElButton>
    </div>
  </div>
</template>

<script>
import { isEmpty } from '../utils'
import { Button } from 'element-ui'

import BaseFilter from './BaseFilter.vue'
import { FilterOptions } from './constants'
import { getColumnDefaultFilterData } from '../base-table/utils'

export default {
  name: 'TableFilter',
  components: {
    ElButton: Button,
    BaseFilter,
  },
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    scope: {
      type: Object,
      required: true,
    },
    options: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      FilterOptions,
      option: { data: {} },
      valueOptions: [],
    }
  },
  computed: {
    isCustomOptions() {
      return !!this.options?.length
    },
  },
  watch: {
    'scope.column.field': function (field) {
      const { $table } = this.scope

      // 当列发生变化时，关闭当前列的筛选面板，打开新列的筛选面板
      $table.closeFilter()

      if (field) {
        $table.openFilter(field)
      }
    },
  },
  mounted() {
    // #region data
    // 配置数据
    const { $table, column } = this.scope
    this.option = column.filters[0]?.data
      ? column.filters[0]
      : {
          data: getColumnDefaultFilterData(column),
        }
    // #endregion data
    // 下拉选项
    if (this.isCustomOptions) {
      this.valueOptions = this.options
    } else {
      const { fullData = [] } = $table.getTableData()

      this.valueOptions = fullData
        .map((item) => item[column.field])
        .filter((v, index, self) => !isEmpty(v) && self.indexOf(v) === index)
        .map((value) => ({
          label: value,
          value,
        }))
    }
  },
  methods: {
    getExcludeConditions() {
      /**
       * 获取排除的条件
       */
      return this.isCustomOptions ? ['include'] : []
    },
    getIncludeConditions() {
      /**
       * 获取包含的条件
       */
      return []
    },
    // #region reset
    handleReset() {
      const { $panel } = this.scope
      // 调用 vxe-table 重置api
      $panel.resetFilter()
    },
    // #endregion reset
    // #region filter
    async handleFilter(evt) {
      try {
        await this.$refs.filter?.validate()
        const { $panel } = this.scope
        // 调用 vxe-table 筛选api，触发 vxe-table @filter-change事件
        $panel.changeOption(evt, true, this.option)
        $panel.confirmFilter()
      } catch (e) {
        console.log(e)
      }
    },
    // #endregion filter
  },
}
</script>
<style lang="scss" scoped>  
.table-filter {
  padding: 6px;
}
</style>
