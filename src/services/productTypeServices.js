import { api } from '.'
import { productTypeMapper } from '../utils/productTypeMapper'

async function getAllProductTypes() {
   return await fetch(`${api}/product-types`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productTypes) => {
         return {
            code: productTypes.code,
            data: productTypes.data.map((productType) => productTypeMapper(productType)),
         }
      })
}

async function getProductTypeById(productTypeId) {
   return await fetch(`${api}/product-types/edit/${productTypeId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((category) => category)
}

async function createProductType(productTypeInfo) {
   return await fetch(`${api}/product-types/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(productTypeInfo),
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function updateProductType({ productTypeId, productTypeInfo }) {
   return await fetch(`${api}/product-types/update/${productTypeId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(productTypeInfo),
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function deleteProductType(productTypeId) {
   return await fetch(`${api}/product-types/delete/${productTypeId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

export { getAllProductTypes, getProductTypeById, createProductType, updateProductType, deleteProductType }
