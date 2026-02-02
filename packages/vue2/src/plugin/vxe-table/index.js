import Index from './index.vue'
import { VXETable } from 'vxe-table'
import { BaseFilterRenderName } from './base-table/constants'
import {TableFilterRender} from './table-filter/index.jsx'

const plugin = Index

plugin.install = function install(app) {
  VXETable.renderer.add(BaseFilterRenderName, TableFilterRender)
  app.component(Index.name, Index)
}

export default plugin
