import { cartItemMapper } from '../utils/cartMapper'
import { invoiceItemMapper } from '../utils/invoicemapper'
import { api } from './index'

async function getAllInvoices() {
   return await fetch(`${api}/invoices`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((invoices) => {
         return {
            code: invoices.code,
            data: invoices.data.map((invoice) => {
               return {
                  customerId: invoice.customerId,
                  name: invoice.name,
                  address: invoice.address,
                  invoiceList: invoice.invoiceList.map((invoiceItem) => cartItemMapper(invoiceItem)),
               }
            }),
         }
      })
}

async function getAllInvoicesByCustomerId(customerId) {
   return await fetch(`${api}/invoices/${customerId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((invoiceItems) => {
         return {
            code: invoiceItems.code,
            data: invoiceItems.data.map((invoiceItem) => invoiceItemMapper(invoiceItem)),
         }
      })
}

async function createInvoice(invoiceInfo) {
   return await fetch(`${api}/invoices/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceInfo),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function confirmInvoice(invoiceId) {
   return await fetch(`${api}/invoices/confrim-invoice/${invoiceId}`, {
      method: 'PUT',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

export { getAllInvoices, getAllInvoicesByCustomerId, createInvoice, confirmInvoice }
