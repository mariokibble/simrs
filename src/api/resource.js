import axios from "@/libs/axios";
import { SIMRS_TOKEN } from "@/constants/index";
import storage from '@/utils/storage'

function createResource() {
    axios.interceptors.request.use(config => {
        // for intercept request or header request
        const token = storage.get(SIMRS_TOKEN)
    
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // hardcode token for develop purpose
        // const tokenHardcoded = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGIxMjk3ZjQwYzEzNmZkMTUyY2MwMmQ5MmY0MzE0MTIwMDEzZWUzODNiYzcwMWI2NmUxZWUxMGQ0YzU5ZGNkNWZhMDRjOTdlN2VjN2Q4YmYiLCJpYXQiOjE2MTc2OTYxNDksIm5iZiI6MTYxNzY5NjE0OSwiZXhwIjoxNjQ5MjMyMTQ5LCJzdWIiOiIyOSIsInNjb3BlcyI6W119.lPLd7pSaJNv0T87JTMT5Vra4SpUawhpBknIa4ljm9ZBOJXtz38vlAp3f5kdoYM-IOlacZrKtgZ8Am77OtbhIYaKvUulUdK9rQWiVY5UWt-AbaV59M3__FUMVib8BaAGnp7fdXbI7yjPJ7Pt1hqDzAztqUMADZ2vDgxextb9PWDVYlTryCa8lqISpqkBcdt30MT97yHbjovOev3wg6TD4o4L_oQMmVkVJsdAYb4nFEbu_H7yPQAfb15rlKefHJvVqFwafwgJN0wmmURgdnL7EtEf9LzCov3FyxARVemdcMhE6dIkQ8CuJnSeI25TNn0LlAfa4tFOBrI_Rm0mMXURpVdy0PHXrrV7dxcIQ456qlkqUQnZ_uVpOu7xvfHxUtbMjcxs6VYdRFTt-x_NOCNqzhjqw9SGrn1P4hiW2T7pfEo4c5QbeNztusyiCgOhuI73ZiSHGt6O0-oSKYPKRPVbcr73939FuMzNuF5Pp2PIGSnr7AZr5rJ18UzkiOKbllireDnk4Tpz8aQ9XF_qSIvGwMwwd8Q8y6O3X5aMyqcbo2uY_n1hjvRHljhbmri5MwXt85OAFV1OCnbeDJIDDEabsKaq0jljN4q14efSMl4FouzNMG5BWPhG9Akz1nKMObpR5fZ1m2G_4VdoMs_nyqi7ygITzSNFjcBQuULponsWJ_50"
        // config.headers.Authorization = `Bearer ${tokenHardcoded}`
    
        return config
      }, error => {
        return Promise.reject(error)
    })

    return axios
}


export default createResource()