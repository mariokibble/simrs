import endpoint from '../endpoint'
import resource from '../resource'

export default {
  getPoli() {
    const request = resource.get(`${endpoint.pemeriksaan.poliklinik}`)
    return request
  },

  getDokter(data) {
    const request = resource.get(`${endpoint.pemeriksaan.dokter}?${data}`)
    return request
  },
  pendaftaran(data) {
    const request = resource.post(`${endpoint.pemeriksaan.pendaftaran}`, data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return request
  },
  getAntrianRajal({ limit = 10, page = 1, poli = '' }) {
    // TODO: rs_id should get from storage
    const request = resource.get(`${endpoint.pemeriksaan.pendaftaran}?rs_id=1&status=1&limit=${limit}&page=${page}&poli_id=${poli || ''}`)
    return request
  },
}
