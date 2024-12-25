import { api } from '.'
import { cartItemMapper } from '../utils/cartMapper'

async function getAllOrders() {
   return await fetch(`${api}/orders`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((orders) => {
         return {
            code: orders.code,
            data: orders.data?.map((order) => {
               return {
                  customerId: order.MAKH,
                  name: order.TENKH,
                  address: order.DIACHIGOAO,
                  orderList: order.DANHSACHSANPHAM.map((orderItem) => cartItemMapper(orderItem)),
               }
            }),
         }
      })
}

async function createOrder(cartItem) {
   return await fetch(`${api}/orders/create`, {
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

async function cancelOrder(cartItem) {
   return await fetch(`${api}/orders/cancel-order`, {
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

async function getSearchResults(query) {
   return await fetch(`${api}/invoices/search?q=${query}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((searchResults) => {
         return {
            code: searchResults.code,
            data: searchResults.data?.map((order) => {
               return {
                  customerId: order.MAKH,
                  name: order.TENKH,
                  address: order.DIACHIGOAO,
                  orderList: order.DANHSACHSANPHAM.map((orderItem) => cartItemMapper(orderItem)),
               }
            }),
         }
      })
}

export { getAllOrders, createOrder, cancelOrder, getSearchResults }
