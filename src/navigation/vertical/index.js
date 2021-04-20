export default [

  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
  },
  {
    title: 'Rawat jalan',
    icon: 'MoreHorizontalIcon',
    children: [
      {
        title: 'Antrian Verifikasi',
        route: 'antrian-verifikasi',
        icon: 'HomeIcon',
      },
      {
        title: 'Antrian TTV',
        route: 'antrian-ttv',
        icon: 'HomeIcon',
      },
      {

        title: 'Antrian Poliklinik',
        route: 'antrian-poliklinik',
        icon: 'HomeIcon',
      },
      {
        title: 'List Kehadiran',
        route: 'list-kehadiran',
        icon: 'HomeIcon',
      },
    ],
  },
  {
    title: 'Logout',
    route: 'logout',
    icon: 'LogOutIcon',
  },
]
