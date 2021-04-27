export default [

  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
  },
  {
    title: 'Rawat jalan',
    icon: 'RawatJalan',
    iconCustom: true,
    children: [
      {
        title: 'Antrian Verifikasi',
        route: 'antrian-verifikasi',
        icon: 'AntrianVerifikasi',
        iconCustom: true,
      },
      {
        title: 'List Kehadiran',
        route: 'list-kehadiran',
        icon: 'ListKehadiran',
        iconCustom: true,
      },
      {
        title: 'Antrian TTV',
        route: 'antrian-ttv',
        icon: 'AntrianTTV',
        iconCustom: true,
      },
      {

        title: 'Antrian Poliklinik',
        route: 'antrian-poliklinik',
        icon: 'AntrianPoliklinik',
        iconCustom: true,
      },
    ],
  },
  {
    title: 'Rawat inap',
    route: 'Rawat inap',
    icon: 'RawatInap',
    iconCustom: true,
  },
  {
    title: 'Laboratorium',
    icon: 'Laboratorium',
    iconCustom: true,
    children: [
      {
        title: 'Antrian Laboratorium',
        route: 'antrian-lab',
        icon: 'AntrianLab',
        iconCustom: true,
      },
      {
        title: 'Antrian Pending',
        route: 'antrian-lab-pending',
        icon: 'AntrianLabPending',
        iconCustom: true,
      },
    ],
  },
  {
    title: 'Radiologi',
    icon: 'Radiologi',
    iconCustom: true,
    children: [
      {
        title: 'Antrian Radiologi',
        route: 'antrian-radiologi',
        icon: 'AntrianRadiologi',
        iconCustom: true,
      },
      {
        title: 'Antrian Pending',
        route: 'antrian-radiologi-pending',
        icon: 'AntrianRadiologiPending',
        iconCustom: true,
      },
    ],
  },
  {
    title: 'Farmasi',
    route: 'antrian-farmasi',
    icon: 'Farmasi',
    iconCustom: true,
  },
  {
    title: 'Kasir',
    route: 'Kasir',
    icon: 'Kasir',
    iconCustom: true,
  },
  {
    title: 'Logout',
    route: 'logout',
    icon: 'LogOutIcon',
  },
]
