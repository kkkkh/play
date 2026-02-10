import { filterValue } from './filters'
import TableFilter from './index.vue'
import { getColumnDefaultFilterData } from '../base-table/utils'
// #region config
export const filterConfig = {
  showFilterFooter: false,
  renderFilter(h, { attrs, props }, params) {
    // 注冊筛选组件
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
    // 这里的注意点：
    // 如果设置为remote = true，$panel.confirmFilter()调用时，这里不会触发
    return filterValue(cellValue, option.data)
  },
}
// #endregion config
