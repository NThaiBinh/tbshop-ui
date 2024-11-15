import { api } from './index'

async function getAllPosition(page) {
   return await fetch(`${api}/positions?page=${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((respones) => respones.json())
      .then((positions) => positions)
}

export { getAllPosition }
