import endpoint from '../endpoint'
import resource from '../resource'

export default {
  getQrCodePasien() {
    const request = resource.post(`${endpoint.auth.getQrCodePasien}`)
    return request
  },
  getOtp(data) {
    const request = resource.post(`${endpoint.auth.getOtp}`, data)
    return request
  },
  checkOtp(data) {
    const request = resource.post(`${endpoint.auth.checkOtp}`, data)
    return request
  },
  logout() {
    const request = resource.post(`${endpoint.auth.logout}`)
    return request
  },
  getUserLoggedIn() {
    const request = resource.post(`${endpoint.auth.checkToken}`)
    return request
  },
  login(data) {
    const request = resource.post(`${endpoint.auth.loginAdmin}`, data)
    return request
  },
}
