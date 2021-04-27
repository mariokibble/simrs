import endpoint from '../endpoint'
import resource from '../resource'

export default {
  getRadiologis() {
    const request = resource.get(`${endpoint.radiologi.radiologi}?rs_id=1`)
    return request
  },
  orderRadiologi(data) {
    const request = resource.post(endpoint.radiologi.orderRadiologi, data)
    return request
  },
  getLastOrderRadiologi(userId) {
    const request = resource.get(`${endpoint.radiologi.lastOrderRadilogi}/${userId}`)
    return request
  },
  updateOrderRadiologi(data) {
    const request = resource.post(endpoint.radiologi.updateOrderRadiologi, data)
    return request
  },
}
