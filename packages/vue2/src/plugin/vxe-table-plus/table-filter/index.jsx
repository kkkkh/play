import { filterValue } from './filters'
import TableFilter from './index.vue'
import { getColumnDefaultFilterData } from '../base-table/utils'

export const filterConfig = {
  showFilterFooter: false,
  renderFilter(h, { attrs, props }, params) {
    return <TableFilter {...{ attrs, props }} scope={params} />
  },
  // 重置数据方法
  filterResetMethod({ column, options }) {
    for (const option of options) {
      option.data = getColumnDefaultFilterData(column)
    }
  },
  // 筛选方法
  filterMethod({ cellValue, option }) {
    // $panel.confirmFilter()
    // 这里的注意点：如果设置为remote = true，这里不会触发
    return filterValue(cellValue, option.data)
  },
}
