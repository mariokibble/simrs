export default {
  example: {
    index: '',
  },
  auth: {
    getOtp: '/auth/otp',
    checkOtp: '/auth/otp/check',
    checkToken: '/auth/user',
    loginAdmin: '/auth/login/admin',
    logout: '/auth/logout',
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
    ttv: '/pemeriksaan/ttv',
    hapus: '/pemeriksaan/cancel',
    update: '/pemeriksaan/update',
    dokterByRs: '/dokter/by_rs',
    mulaiTtv: '/pemeriksaan/schedule/start_ttv',
    selesaiTtv: '/pemeriksaan/schedule/stop_ttv',
    mulaiPoli: '/pemeriksaan/schedule/start_poli',
    rumahSakit: '/rumah_sakit',
    verifikasi: '/pemeriksaan/verifikasi',
    laboratorium: '/pemeriksaan/laboratorium',
    radiologi: '/pemeriksaan/radiologi'
  },
}
