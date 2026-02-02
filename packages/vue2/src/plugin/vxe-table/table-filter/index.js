import TableFilter from './index.vue'

const plugin = TableFilter

plugin.install = function install(app) {
  app.component(TableFilter.name, TableFilter)
}

export * from './filters'
export * from './utils'

export default plugin
