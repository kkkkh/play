import TrDynamicTags from './TrDynamicTags.vue'

const plugin = TrDynamicTags

plugin.install = function install(app) {
  app.component(TrDynamicTags.name, TrDynamicTags)
}

export default plugin
