import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/Login/Login.vue'),
      meta: {
        layout: 'full',
        requiresAuth: false,
      },
    },
    {
      path: '/antrian-ttv',
      name: 'antrian-ttv',
      component: () => import('@/pages/AntrianTtv'),
      meta: {
        pageTitle: 'Antrian TTV',
        breadcrumb: [
          {
            text: 'Antrian TTV',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-poliklinik',
      name: 'antrian-poliklinik',
      component: () => import('@/pages/AntrianPoli'),
      meta: {
        pageTitle: 'Antrian Poliklinik',
        breadcrumb: [
          {
            text: 'Antrian Poliklinik',
            active: true,
          },
        ],
      },
    },
    {
      path: '/list-kehadiran',
      name: 'list-kehadiran',
      component: () => import('@/pages/ListKehadiran'),
      meta: {
        pageTitle: 'List Kehadiran',
        breadcrumb: [
          {
            text: 'List Kehadiran',
            active: true,
          },
        ],
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/pages/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
