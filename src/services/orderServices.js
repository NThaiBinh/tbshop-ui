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
            data: orders.data.map((order) => {
               return {
                  customerId: order.customerId,
                  name: order.name,
                  address: order.address,
                  orderList: order.orderList.map((orderItem) => cartItemMapper(orderItem)),
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

export { getAllOrders, createOrder, cancelOrder }
