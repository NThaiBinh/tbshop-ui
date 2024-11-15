import { api } from './index'

async function getCustomerInfo(customerId) {
   return await fetch(`${api}/customers/info/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((customerInfo) => customerInfo)
}

async function login(email, password) {
   const infoLogin = {
      email,
      password,
   }

   return await fetch(`${api}/customers/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoLogin),
   })
      .then((response) => response.json())
      .then((info) => info)
}

export { login, getCustomerInfo }
