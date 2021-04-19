export default {
  namespaced: true,
  state: {
    loading: false,
  },
  getter: {},
  actions: {
    show({ commit }) {
      commit('show')
    },
    hide({ commit }) {
      commit('hide')
    },
  },
  mutations: {
    show(state) {
      state.loading = true
    },
    hide(state) {
      state.loading = false
    },
  },
}
