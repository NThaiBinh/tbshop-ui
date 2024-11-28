import { api } from '.'
import { storeInfoMapper } from '../utils/storeInfoMapper'

async function getStoreInfo() {
   return await fetch(`${api}/store-info`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((storeInfo) => {
         return {
            code: storeInfo.code,
            data: storeInfoMapper(storeInfo.data),
         }
      })
}

export { getStoreInfo }
