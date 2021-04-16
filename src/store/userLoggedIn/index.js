export default {
  namespaced: true,
  state: {
    user: null,
    dataUserFromStorage: null,
  },
  mutations: {
    UPDATE_USER(state, val) {
      state.user = val
    },
    UPDATE_DATA_USER_FROM_STORAGE(state, val) {
      state.dataUserFromStorage = val
    },
  },
  actions: {},
}
