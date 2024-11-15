import { api } from '.'
import { categoryMapper } from '../utils/categoryMapper'

async function getAllCategories() {
   return await fetch(`${api}/categories`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((categories) => {
         return {
            code: categories.code,
            data: categories.data.map((category) => categoryMapper(category)),
         }
      })
}

async function getCategoryById(categoryId) {
   return await fetch(`${api}/categories/edit/${categoryId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((category) => category)
}

async function createCategory(categoryInfo) {
   return await fetch(`${api}/categories/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryInfo),
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function updateCategory({ categoryId, categoryInfo }) {
   return await fetch(`${api}/categories/update/${categoryId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryInfo),
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

async function deleteCategory(categoryId) {
   return await fetch(`${api}/categories/delete/${categoryId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
