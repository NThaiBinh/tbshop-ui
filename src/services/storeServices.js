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

async function updateStoreInfo(storeInfo) {
   return await fetch(`${api}/store-info/update`, {
      method: 'PUT',
      credentials: 'include',
      body: storeInfo,
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { getStoreInfo, updateStoreInfo }
