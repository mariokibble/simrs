import Cookie from 'universal-cookie'

const cookie = new Cookie()

const methodsOfCookie = {
  cookie,
  getStorage: key => cookie.get(key, { path: '/' }),
  setStorage: (key, value) => {
    cookie.set(key, value, { path: '/' })
  },
  removeItemStorage: key => {
    cookie.remove(key, { path: '/' })
  },
  clearStorage: () => {
    const cookieNames = Object.keys(cookie.getAll())

    cookieNames.forEach(cookieName => cookie.remove(cookieName, { path: '/' }))
  },
}

export default methodsOfCookie
