import { api } from '.'
import { customerMapper } from '../utils/customerMapper'
import { employeeMapper } from '../utils/employeeMapper'

async function register(registerInfo) {
   return await fetch(`${api}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerInfo),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function getUserInfoById(userId = '') {
   if (userId.startsWith('NV')) {
      return await fetch(`${api}/employees/edit/${userId}`, {
         method: 'GET',
         credentials: 'include',
      })
         .then((response) => response.json())
         .then((employeeInfo) => {
            return {
               code: employeeInfo.code,
               data: {
                  ...employeeMapper(employeeInfo.data),
                  roles: employeeInfo.data.roles,
               },
            }
         })
   } else {
      return await fetch(`${api}/customers/edit/${userId}`, {
         method: 'GET',
         credentials: 'include',
      })
         .then((response) => response.json())
         .then((customerInfo) => {
            return {
               code: customerInfo.code,
               data: {
                  ...customerMapper(customerInfo.data),
                  roles: customerInfo.data.roles,
               },
            }
         })
   }
}

async function login(loginInfo) {
   return await fetch(`${api}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
   })
      .then((response) => response.json())
      .then((userInfo) => userInfo)
}

async function logout(loginInfo) {
   return await fetch(`${api}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { register, login, logout, getUserInfoById }
