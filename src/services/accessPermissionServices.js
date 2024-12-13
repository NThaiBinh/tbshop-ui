import { api } from '.'
import { accessPermissionMapper } from '../utils/accessPermissionMapper'

async function getAllUserAndRoles() {
   return await fetch(`${api}/access-permissions`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((userRoles) => {
         return {
            code: userRoles.code,
            data: userRoles.data.map((userRole) => accessPermissionMapper(userRole)),
         }
      })
}

async function updateUserRole(accountId, roleInfo) {
   return await fetch(`${api}/access-permissions/update/${accountId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roleInfo }),
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { getAllUserAndRoles, updateUserRole }
