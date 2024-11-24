import { api } from './index'

async function getCustomerInfo(customerId) {
   return await fetch(`${api}/customers/info/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((customerInfo) => customerInfo)
}

export { getCustomerInfo }
