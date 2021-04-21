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
    const tokenHardcoded = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWUzN2MzOTAzYzNlNjlhMmFhZjllZTdmOWFjYjIxYTBmMTVlYzkxZTBiNWQ0YjNjMjE4NDI0ZDEwNzY2MmQ5NDQ5YzRiZWYwOGZjNWNhMDYiLCJpYXQiOjE2MTg5NTgxNDEsIm5iZiI6MTYxODk1ODE0MSwiZXhwIjoxNjUwNDk0MTQxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.YFnRLOaVGqwjYSnEcOKGBSKKp4tGWC--ZxlfSWbWQG6unOGzSjWv1px465ONxbk4g3fwPUTLptwouW40YYYV5kvVGJhfAizGJHmOZ1h1wzOoDbd3w9pjb4WWFoDhCniAONpvFeC1e--PARMYkjiHJqkn3eYNIrqlL6ygoExIVP7ATuapR10e3ySbDKmFdr-1PBiTXjjNCKMQ4quPadZpS_dSNnbt06b0ixByvK9YBZsApcI8n5NdPEyBHxQGB8UHyqpbX-OgNIPqjS5iXDn1f16ZKsyVe6akXG0rGg1GQxIXellci9Ta_-k0qvBrle0le3veUiP10xvashqV3HENRQNxSeTlEyDnyKZgZcZ79Ze7Yxozh_6wx3vByWrFgQWii9R3Ik4oko9axaM9CkKzTNrbJQzJj5VlK86AdWaKjkF72HahS6HDJivlMYNAZtEkLFVAWGVUDSx6F9kuwZfpDcrcHnmUS22LsrH0xilbxnvmxr2towz1vcw0A3gANajYHKqhQlDXr3FyEnC6lafI0GHupnbMiUtOMqjBqjmppPRSTT90DMkwEfMGk9fmO_DruhajVeOeT9Cgx5XDO1wDdPejDulLvrsjT8txSZhJ8k9fFK20fp0WX1daNifJt9GvF1orh-alU8t_Se0m0tnOUViFXhpqhp6-xjX-fWgOMqk'
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${tokenHardcoded}`

    return config
  }, error => Promise.reject(error))

  return axios
}

export default createResource()
