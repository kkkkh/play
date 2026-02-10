import VxeTablePlus from './index.vue'
import { VXETable } from 'vxe-table'
import { BaseFilterRenderName } from './base-table/constants.js'
import {filterConfig} from './table-filter/index.jsx'

// #region vxe-plus
VxeTablePlus.install = function install(Vue) {
  VXETable.renderer.add(BaseFilterRenderName, filterConfig)
  Vue.component(VxeTablePlus.name, VxeTablePlus)
}
// #endregion vxe-plus
export default VxeTablePlus
