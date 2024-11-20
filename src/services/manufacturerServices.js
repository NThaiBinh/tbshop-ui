import { api } from '.'
import { manufacturerMapper } from '../utils/manufacturerMapper'

async function getAllManufacInPage(page) {
   return await fetch(`${api}/manufacturers/?page=${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((manufacs) => {
         return {
            code: manufacs.code,
            data: manufacs.data.map((manufac) => manufacturerMapper(manufac)),
         }
      })
}

async function getAllManufacs() {
   return await fetch(`${api}/manufacturers`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((manufacs) => {
         return {
            code: manufacs.code,
            data: manufacs.data.map((manufac) => manufacturerMapper(manufac)),
         }
      })
}

async function createManufacturer(manufacturerInfo) {
   return await fetch(`${api}/manufacturers/create`, {
      method: 'POST',
      credentials: 'include',
      body: manufacturerInfo,
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function getManufacturerById(manufacturerId) {
   return await fetch(`${api}/manufacturers/edit/${manufacturerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((manufacturer) => manufacturer)
}

async function updateManufacturer({ manufacId, formData }) {
   return await fetch(`${api}/manufacturers/update/${manufacId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function deleteManufac(manufacId) {
   return await fetch(`${api}/manufacturers/delete/${manufacId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

export {
   getAllManufacInPage,
   getAllManufacs,
   createManufacturer,
   getManufacturerById,
   updateManufacturer,
   deleteManufac,
}
