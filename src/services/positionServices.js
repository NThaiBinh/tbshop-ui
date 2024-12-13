import { positionMapper } from '../utils/positionMapper'
import { api } from './index'

async function getAllPositions() {
   return await fetch(`${api}/positions`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((respones) => respones.json())
      .then((positions) => {
         return {
            code: positions.code,
            data: positions.data.map((position) => positionMapper(position)),
         }
      })
}

async function getPositionById(positionId) {
   return await fetch(`${api}/positions/edit/${positionId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((respones) => respones.json())
      .then((position) => {
         return {
            code: position.code,
            data: positionMapper(position.data),
         }
      })
}

async function createPosition(positionInfo) {
   return await fetch(`${api}/positions/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionInfo),
   })
      .then((respones) => respones.json())
      .then((result) => result)
}

async function updatePosition(positionInfo) {
   return await fetch(`${api}/positions/update/${positionInfo.positionId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionInfo),
   })
      .then((respones) => respones.json())
      .then((result) => result)
}

async function deletePosition(positionId) {
   return await fetch(`${api}/positions/delete/${positionId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((respones) => respones.json())
      .then((result) => result)
}

export { getAllPositions, createPosition, getPositionById, updatePosition, deletePosition }
