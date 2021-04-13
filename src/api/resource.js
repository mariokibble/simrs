import axios from '@/libs/axios'
import { SIMRS_TOKEN } from '@/constants/index'
import storage from '@/utils/storage'

function createResource() {
  axios.interceptors.request.use(config => {
    // for intercept request or header request
    const token = storage.getStorage(SIMRS_TOKEN)

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    // hardcode token for develop purpose
    const tokenHardcoded = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmNjZTkzNzk4ZjAzOTZhNzIwYmJmNDEyMDU1NTRhMGY0NmIwNjhmY2M1YzllMjI1OTBiMTljNzdjMWVjNmUwNmI3MzEwY2Q2NDRiMzlhYjgiLCJpYXQiOjE2MTgyODc1MTAsIm5iZiI6MTYxODI4NzUxMCwiZXhwIjoxNjQ5ODIzNTEwLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.KIVMRVyidT0VvLE3y7M-gdmGcwrx8DN-_-9pz4v6h8_A_Rx127c99zYb3ftZ6gTTNG5yA31y6uOLpjTkPvVBNSur0jNr1BKVaLVWu9KUApfIIBRfuJnlzw2N6lgFgPzBSLYknNph22YUYC2TZbPGwUSng35ovL6liFz6keUljeKfKJdHmsjcmBRrTL5e1NzNJJYwBWRXfQjCRgEhuXjKLog93zkM3k60rCCsoZs12ZuTXmRCZf1AMu0-dwMd3Ho2VmmcnsqFAKVIdSQXjrU5Z6z5GA3ebzK_Duo_TN3funw2ncLHfrPSQRWlXdl81SAqdU2S_SuJJe95ueyUETmNkIYTUvDXeeJVGO1zBrY4TXFRonBJaGARXZ7Ws3wBKw_Ip5_erlkD7wL4uRZphLtZsRGiVmGBrZuNQQIomOz5D_sHikLaGOV9MlL1Cn_GuFLJ2cqibmzr7Y-IMfhDdrVtWkUnQseK_R-BNEFg09_RuNqDJZcHr1LFC8hu0BJOGUqEflOKxYCY8SqoKZdF6Wmon_t87u7Dr1CcjlVoryHsL07-NEQM_s5EREKc9g-oJ5Tn7N5WT6CwTOvtE4-z5_NebxlonCHWtxpK5M3o2x1teZDjQvrYoZetAnytw6VgtxaOpPcsmLL-JmaYIIFUw88rU3qPf4gV2pyo9X1FW9qy7Dg'
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${tokenHardcoded}`

    return config
  }, error => Promise.reject(error))

  return axios
}

export default createResource()
