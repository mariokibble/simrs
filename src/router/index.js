import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserDataFromStorage } from '@/utils/getDataStorage'
import authRouter from './authRouter'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...authRouter,
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/pages/Dashboard'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Dashboard',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-verifikasi',
      name: 'antrian-verifikasi',
      component: () => import('@/pages/Verifikasi'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Verifikasi',
        breadcrumb: [
          {
            text: 'Rawat jalan',
            active: false,
          },
          {
            text: 'Antrian Verifikasi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-verifikasi/:id',
      name: 'detail-verifikasi',
      component: () => import('@/pages/DetailVerifikasi/DetailVerifikasi.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Detail Verifikasi',
        breadcrumb: [
          {
            text: 'Rawat jalan',
            active: false,
          },
          {
            text: 'Antrian Verifikasi',
            to: { name: 'antrian-verifikasi' },
            active: false,
          },
          {
            text: 'Detail Verifikasi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-ttv',
      name: 'antrian-ttv',
      component: () => import('@/pages/AntrianTtv'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian TTV',
        breadcrumb: [
          {
            text: 'Rawat jalan',
            active: false,
          },
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
        requiresAuth: true,
        pageTitle: 'Antrian Poliklinik',
        breadcrumb: [
          {
            text: 'Rawat jalan',
            active: false,
          },
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
        requiresAuth: true,
        pageTitle: 'List Kehadiran',
        breadcrumb: [
          {
            text: 'Rawat jalan',
            active: false,
          },
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

router.beforeEach((to, from, next) => {
  const { tokenCurrent } = getUserDataFromStorage()
  const isLoggedIn = () => !!tokenCurrent
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (isLoggedIn()) {
    next({
      path: '/',
    })
  } else {
    next()
  }
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
