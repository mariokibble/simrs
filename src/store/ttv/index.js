import fetchApi from '@/api'

export const FORM_TYPES = {
  ID: 'id',
  PEMERIKSAAN_ID: 'pemeriksaan_id',
  KELUHAN_UTAMA: 'keluhan_utama',
  TEKANAN_DARAH: 'tekanan_darah',
  NADI: 'nadi',
  PERNAPASAN: 'pernapasan',
  SUHU_TUBUH: 'suhu',
  SATURASI: 'saturasi',
  BERAT_BADAN: 'berat_bedan',
  TINGGI_BADAN: 'tinggi_badan',
  LINGKAR_KEPALA: 'lingkar_kepala',
  WAKTU_MULAI: 'waktu_mulai',
  WAKTU_SELESAI: 'waktu_selesai',
}

const initalState = {
  formState: {
    [FORM_TYPES.ID]: null,
    [FORM_TYPES.PEMERIKSAAN_ID]: null,
    [FORM_TYPES.KELUHAN_UTAMA]: null,
    [FORM_TYPES.TEKANAN_DARAH]: null,
    [FORM_TYPES.NADI]: null,
    [FORM_TYPES.PERNAPASAN]: null,
    [FORM_TYPES.SUHU_TUBUH]: null,
    [FORM_TYPES.SATURASI]: null,
    [FORM_TYPES.BERAT_BADAN]: null,
    [FORM_TYPES.TINGGI_BADAN]: null,
    [FORM_TYPES.LINGKAR_KEPALA]: null,
    [FORM_TYPES.WAKTU_MULAI]: null,
    [FORM_TYPES.WAKTU_SELESAI]: null,
  },
}

export default {
  namespaced: true,
  state: initalState,
  mutations: {
    SET_ENTRY_FORM(state, { key, value }) {
      state.formState[key] = value
    },
    CLEAR_ENTRY_FORM(state) {
      const keysOfState = Object.keys(state.formState)
      keysOfState.forEach(key => {
        state.formState[key] = null
      })
    },
  },
  actions: {
    addTtv({ state, commit }) {
      return new Promise((res, rej) => (async () => {
        try {
          const formData = { ...state.formState }
          // eslint-disable-next-line no-restricted-syntax
          for (const key in formData) {
            if (!formData[key]) {
              delete formData[key]
            }
          }
          await fetchApi.pemeriksaan.addTtv(formData)
          await fetchApi.pemeriksaan.selesaiTtv(state.formState[FORM_TYPES.PEMERIKSAAN_ID])
          commit('CLEAR_ENTRY_FORM')
          return res(true)
        } catch (error) {
          return rej(error.response)
        }
      })())
    },
  },
}
