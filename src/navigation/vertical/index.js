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
        icon: 'ListKehadiran',
        iconCustom: true,
      },
      { 
        title: 'Antrian Pending',
        route: 'antrian-lab-pending',
        icon: 'ListKehadiran', 
        iconCustom: true,
      }
    ]
  },
  {
    title: 'Radiologi',
    route: 'antrian-radiologi',
    icon: 'Radiologi',
    iconCustom: true,
  },
  {
    title: 'Farmasi',
    route: 'Farmasi',
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
