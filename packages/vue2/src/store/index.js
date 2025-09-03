import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

const modules = {}

const modulesFiles = import.meta.glob('./modules/*.js', { eager: true,import:'default' })

Object.keys(modulesFiles).reduce((prev, curr) => {
  const match = /^\.\/modules\/(.*)\.js$/.exec(curr)
  const moduleName = match ? match[1] : null

  if (moduleName) {
    prev[moduleName] = modulesFiles[curr]
  }

  return prev
}, modules)

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  getters,
})

export default store
