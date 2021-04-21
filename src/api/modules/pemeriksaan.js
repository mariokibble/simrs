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
  getVerifikasi(query) {
    return resource.get(`${endpoint.pemeriksaan.verifikasi}?${query}`)
  },
  getAntrianTtv(query) {
    // TODO: rs_id should get from storage
    return this.getPemeriksaan(`status=2&${query}`)
  },
  getAntrianPoli(query) {
    // TODO: rs_id should get from storage
    return this.getPemeriksaan(`${query}`)
  },
  getAntrianVerifikasi(query) {
    return this.getVerifikasi(`${query}`)
  },
  addTtv(form) {
    const request = resource.post(`${endpoint.pemeriksaan.ttv}`, form)
    return request
  },
  getPemeriksaanById(id) {
    const request = resource.get(`${endpoint.pemeriksaan.pendaftaran}/${id}`)
    return request
  },
  deletePemeriksaan(id) {
    const request = resource.post(`${endpoint.pemeriksaan.hapus}/${id}`)
    return request
  },
  updateStatusAcceptedVerifikasi(idPemeriksaan) {
    const request = resource.post(`${endpoint.pemeriksaan.verifikasi}/${idPemeriksaan}`)
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
  mulaiTtv(pemeriksaanId) {
    const request = resource.post(`${endpoint.pemeriksaan.mulaiTtv}/${pemeriksaanId}`)
    return request
  },
  selesaiTtv(pemeriksaanId) {
    const request = resource.post(`${endpoint.pemeriksaan.selesaiTtv}/${pemeriksaanId}`)
    return request
  },
  mulaiPoli(pemeriksaanId) {
    const request = resource.post(`${endpoint.pemeriksaan.mulaiPoli}/${pemeriksaanId}`)
    return request
  },
  getKehadiran(query) {
    return this.getPemeriksaan(query)
  },
  getRumahSakit() {
    const request = resource.get(`${endpoint.pemeriksaan.rumahSakit}`)
    return request
  },
}
