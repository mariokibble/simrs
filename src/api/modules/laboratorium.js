import endpoint from '../endpoint'
import resource from '../resource'

export default {
  getLayanan() {
    const request = resource.get(`${endpoint.laboratorium.layanan}?rs_id=1`)
    return request
  },
}
