
const moduleState = {
  extraBtnPermission: new Set(),
}

const getters = {
  extraBtnPermission: (state) => state.extraBtnPermission,
}

const mutations = {
  setExtraButtonPermissions(state, data) {
    state.extraBtnPermission.add(data)
  },
  clearExtraButtonPermissions(state, data) {
    if (state.extraBtnPermission.has(data)) {
      state.extraBtnPermission.delete(data)
    }
  },
}

const actions = {
}

export default {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
}
