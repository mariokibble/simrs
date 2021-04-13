export default {
  example: {
    index: '',
  },
  auth: {
    getOtp: '/auth/otp',
    checkOtp: '/auth/otp/check',
    checkToken: '/auth/user',
    loginAdmin: '/auth/login/admin',
    logout: '/logout',
    registerPasien: '/auth/register',
    editProfile: '/auth/profile',
    getQrCodePasien: '/auth/qrcode',
    scanQrCodePasien: '/auth/qrcode/scan',
  },
  location: {
    province: '/location/province',
    regency: '/location/regency',
    district: '/location/district',
    village: '/location/village',
  },
  pemeriksaan: {
    poliklinik: '/poli',
    dokter: '/dokter',
    pendaftaran: '/pemeriksaan',
    riwayat: '/pemeriksaan/user',
  },
}
