import {
  SIMRS_NO_HANDPHONE, SIMRS_TOKEN, SIMRS_ROLE_ID, SIMRS_OTP_NUMBER, SIMRS_RS_ID,
} from '@/constants/index'
import storage from './storage'

export const getUserDataFromStorage = () => ({
  token: storage.getStorage(SIMRS_TOKEN),
  roleId: storage.getStorage(SIMRS_ROLE_ID),
  noHandphone: storage.getStorage(SIMRS_NO_HANDPHONE),
  otpNumber: storage.getStorage(SIMRS_OTP_NUMBER),
  rsId: storage.getStorage(SIMRS_RS_ID),
})

export default {}
