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
      path: '/antrian-lab',
      name: 'antrian-lab',
      component: () => import('@/pages/AntrianLab'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Laboratorium',
        breadcrumb: [
          {
            text: 'Laboratorium',
            active: false,
          },
          {
            text: 'Antrian Laboratorium',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-lab-pending',
      name: 'antrian-lab-pending',
      component: () => import('@/pages/AntrianLabPending'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Laboratorium Pending',
        breadcrumb: [
          {
            text: 'Laboratorium',
            active: false,
          },
          {
            text: 'Antrian Laboratorium Pending',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-lab/:id',
      name: 'detail-lab',
      component: () => import('@/pages/DetailIsianLab/DetailIsianLab.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Input Hasil Laboratorium',
        breadcrumb: [
          {
            text: 'Laboratorium',
            active: false,
          },
          {
            text: 'Antrian Laboratorium',
            to: { name: 'antrian-lab' },
            active: false,
          },
          {
            text: 'Input Hasil Laboratorium',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-radiologi',
      name: 'antrian-radiologi',
      component: () => import('@/pages/AntrianRadiologi'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Radiologi',
        breadcrumb: [
          {
            text: 'Antrian Radiologi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-radiologi/:id',
      name: 'detail-radiologi',
      component: () => import('@/pages/DetailIsianRadiologi/DetailIsianRadiologi.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Input Hasil Radiologi',
        breadcrumb: [
          {
            text: 'Antrian Radiologi',
            to: { name: 'antrian-radiologi' },
            active: false,
          },
          {
            text: 'Input Hasil Radiologi',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-radiologi-pending',
      name: 'antrian-radiologi-pending',
      component: () => import('@/pages/AntrianRadiologiPending/index.js'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Radiologi Pending',
        breadcrumb: [
          {
            text: 'Radiologi',
            active: false,
          },
          {
            text: 'Antrian Radilogi Pending',
            active: true,
          },
        ],
      },
    },
    {
      path: '/antrian-farmasi',
      name: 'antrian-farmasi',
      component: () => import('@/pages/AntrianFarmasi'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Antrian Farmasi',
        breadcrumb: [
          {
            text: 'Farmasi',
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
