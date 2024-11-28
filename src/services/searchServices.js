import { api } from '.'

async function searchProduct(searchValue) {
   return await fetch(`${api}/searchs/products?key=${searchValue}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((searchResults) => searchResults)
}

export { searchProduct }
