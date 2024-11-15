import { api } from './index'

async function getAllEmployees(page) {
   return await fetch(`${api}/employees/page/${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((employees) => employees)
}

export { getAllEmployees }
