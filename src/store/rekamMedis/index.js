export default {
  namespaced: true,
  state: {
    pemeriksaan: null,
    fetchingPemeriksaan: 'idle',
  },
  mutations: {
    UPDATE_PEMERIKSAAN(state, val) {
      state.pemeriksaan = val
      state.fetchingPemeriksaan = 'resolved'
    },
    UPDATE_FETCHING_PEMERIKSAAN(state, val) {
      state.fetchingPemeriksaan = val
    },
    CLEAR_STATE(state) {
      state.pemeriksaan = null
      state.fetchingPemeriksaan = 'idle'
    },
  },
  actions: {},
}
