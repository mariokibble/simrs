import {
  SIMRS_NO_HANDPHONE, SIMRS_TOKEN_PARENT, SIMRS_ROLE_ID, SIMRS_RS_ID, SIMRS_TOKEN_CURRENT,
} from '@/constants/index'
import storage from './storage'

export const getUserDataFromStorage = () => ({
  tokenParent: storage.getStorage(SIMRS_TOKEN_PARENT),
  tokenCurrent: storage.getStorage(SIMRS_TOKEN_CURRENT),
  roleId: storage.getStorage(SIMRS_ROLE_ID),
  noHandphone: storage.getStorage(SIMRS_NO_HANDPHONE),
  rsId: storage.getStorage(SIMRS_RS_ID),
})

export default {}
