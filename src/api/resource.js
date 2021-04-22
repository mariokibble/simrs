import axios from '@/libs/axios'
import { SIMRS_TOKEN_CURRENT } from '@/constants/index'
import storage from '@/utils/storage'

function createResource() {
  axios.interceptors.request.use(config => {
    // for intercept request or header request
    // const token = storage.getStorage(SIMRS_TOKEN_CURRENT)

    // if (token) {
      // eslint-disable-next-line no-param-reassign
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // hardcode token for develop purpose
    const tokenHardcoded = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2U3MTk1OGE3M2RhNDY2YjYwMGQ4MTM5MDdkY2ZmN2YxNjQ1Y2ZjNTcyZWViYWFiZWViZTNkYjI1OTM3NmEwOGU5ODc0OWEzYTkyNDc2MmIiLCJpYXQiOjE2MTg5ODg0ODIsIm5iZiI6MTYxODk4ODQ4MiwiZXhwIjoxNjUwNTI0NDgyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.VEEsX0kLSU5nMnaWhdcY8YRdnG2IlFZZKPG_lbFgnZXR0I-iZlKQbxpMImOqkvdQiCfNa2_obwmVtXXBnZXOiQFSYfWg4zHKL-alDL03D0IkMtJKo5Msd-nZByozOo4Y0lqPkYet8XstafAWAxEV5ZL9w2oTslDy9calyYyXKhQhUMuHv9JOiC-eFdlHl9E_g2Sy2rhVEk5-2DHxGwLdBl75um97mpdnKIcsd9seADEHYXVNXdMmkpjC37IPd-mu0BEMrhfSsk28Wuu7taV0lhIknHTeEQfr9Zjg45lnzboQkBf09dACrBB_VXSOlv48Ej-cEX1k4nC6gz7P23R_n_0ujKbgnJ_6evHjVa15V0JdGGuFRF1QxxGnruXMwuyijNJSjWQ4nfJpeuoE911Xk2kbL02M4vlTrgA8qGjfaMDTPwzlF3OBwnAYk1NjiLEHrwcevv5izuITaAIcxE1VqYA530QFkL9o-dQKhviflRrMNxdUBIzqbihZWOf_Lpn-zZIPWloMNN8rUvnnMovj72s0VtZbI_olU-OwixVcVgs0qJGeVCycSvWvdM2z6T0bibiNd9Ym02HOq0YY7yepqiOuaCyYNLUU9tWY_Yq8jhJTLcxE2_nU3skkIHvxbUJgIXjyZ5BcITeqpEXhO0u7XZKhSWLgWE5oGJ_ky1Gi8HY'
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${tokenHardcoded}`

    return config
  }, error => Promise.reject(error))

  return axios
}

export default createResource()
