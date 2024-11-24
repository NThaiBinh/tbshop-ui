import { api } from '.'
import { cartItemMapper, cartMapper } from '../utils/cartMapper'

async function getCart(customerId) {
   return await fetch(`${api}/carts/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((cartInfo) => {
         return {
            code: cartInfo.code,
            data: cartMapper(cartInfo.data),
         }
      })
}

async function getCartItems(cartId) {
   return await fetch(`${api}/carts/cart-items/${cartId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((cartItems) => {
         return {
            code: cartItems.code,
            data: cartItems.data.map((cartItem) => cartItemMapper(cartItem)),
         }
      })
}

async function addCartItem(cartItem) {
   return await fetch(`${api}/carts/add-cart-item`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function updateCartItem(cartItem) {
   return await fetch(`${api}/carts/update`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function deleteCartItem(cartItem) {
   return await fetch(`${api}/carts/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { getCart, getCartItems, addCartItem, updateCartItem, deleteCartItem }
