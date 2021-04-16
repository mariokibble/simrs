import { getUserDataFromStorage } from '@/utils/getDataStorage'
import fetchApi from '@/api'
import storage from '@/utils/storage'

const authRouter = [
  {
    path: '/logout',
    name: 'logout',
    meta: {
      layout: 'full',
      requiresAuth: true,
    },
    component: {
      async beforeRouteEnter(to, from, next) {
        try {
          if (getUserDataFromStorage().tokenCurrent) {
            await fetchApi.auth.logout()
            // Todo: show toast
          }
          storage.clearStorage()
          next('/login')
        } catch (error) {
          console.log(error)
          storage.clearStorage()
          next('/login')
        }
      },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/Login.vue'),
    meta: {
      layout: 'full',
      requiresAuth: false,
    },
  },
]

export default authRouter
