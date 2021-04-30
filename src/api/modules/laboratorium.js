import endpoint from '../endpoint'
import resource from '../resource'

export default {
  getLaboratoriums() {
    const request = resource.get(`${endpoint.laboratorium.laboratorium}?rs_id=1`)
    return request
  },
  orderLaboratorium(data) {
    const request = resource.post(endpoint.laboratorium.orderLaboratorium, data)
    return request
  },
  getLastOrderLab(userId) {
    const request = resource.get(`${endpoint.laboratorium.lastOrderLab}/${userId}`)
    return request
  },
  updateOrderLab(data) {
    const request = resource.post(endpoint.laboratorium.updateOrderLab, data)
    return request
  },
  getOrderLabById(id) {
    const request = resource.get(`${endpoint.laboratorium.orderLaboratorium}/${id}`)
    return request
  },
  getAllDokterLab() {
    const request = resource.get(`${endpoint.laboratorium.dokterLab}/1`)
    return request
  },
}
