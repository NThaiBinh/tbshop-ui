import { customerAddressMapper, customerMapper } from '../utils/customerMapper'
import { api } from './index'

async function getAllCustomers() {
   return await fetch(`${api}/customers`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((results) => {
         return {
            code: results.code,
            data: results.data?.map((customer) => customerMapper(customer)),
         }
      })
}

async function getCustomerInfo(customerId) {
   return await fetch(`${api}/customers/info/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((customerInfo) => customerInfo)
}

async function updateCustomer(customerId, customerInfo) {
   return await fetch(`${api}/customers/update/${customerId}`, {
      method: 'PUT',
      credentials: 'include',
      body: customerInfo,
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function createCustomerAddress(customerId, address) {
   return await fetch(`${api}/customers/address/create/${customerId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function getAllCustomerAddress(customerId) {
   return await fetch(`${api}/customers/address/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((customerAddress) => {
         return {
            code: customerAddress.code,
            data: customerAddress.data.map((customerAddress) => customerAddressMapper(customerAddress)),
         }
      })
}

async function updateDefaultCustomerAddress(addressId) {
   return await fetch(`${api}/customers/address/update-default/${addressId}`, {
      method: 'PUT',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function deleteCustomerAddress(addressId) {
   return await fetch(`${api}/customers/address/delete/${addressId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

export {
   getAllCustomers,
   getCustomerInfo,
   updateCustomer,
   createCustomerAddress,
   getAllCustomerAddress,
   deleteCustomerAddress,
   updateDefaultCustomerAddress,
}
