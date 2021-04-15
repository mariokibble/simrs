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
  getPemeriksaan(query) {
    return resource.get(`${endpoint.pemeriksaan.pendaftaran}?${query}`)
  },
  getAntrianTtv(query) {
    // TODO: rs_id should get from storage
    return this.getPemeriksaan(`status=1&${query}`)
  },
  getAntrianPoli(query) {
    // TODO: rs_id should get from storage
    return this.getPemeriksaan(`${query}`)
  },
  addTtv(form) {
    const request = resource.post(`${endpoint.pemeriksaan.ttv}`, form)
    return request
  },
  deletePemeriksaan(id) {
    const request = resource.post(`${endpoint.pemeriksaan.hapus}/${id}`)
    return request
  },
  updatePemeriksaan(data) {
    const request = resource.post(`${endpoint.pemeriksaan.update}`, data)
    return request
  },
  getDokterByRsId(rsId) {
    const request = resource.get(`${endpoint.pemeriksaan.dokterByRs}/${rsId}`)
    return request
  },
}
