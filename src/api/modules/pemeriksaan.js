
import endpoint from '../endpoint'
import resource from '../resource'


export default {
  getPoli () {
    const request = resource.get(`${endpoint.pemeriksaan.poliklinik}`)
    return request
  },

  getDokter (data) {
    const request = resource.get(`${endpoint.pemeriksaan.dokter}?${data}`)
    return request
  },
  pendaftaran (data) {
    const request = resource.post(`${endpoint.pemeriksaan.pendaftaran}`, data, {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return request
  },
}
