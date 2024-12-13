import { invoiceItemMapper, invoicePrintMapper } from '../utils/invoiceMapper'
import { api } from './index'

async function getAllInvoices(status) {
   return await fetch(`${api}/invoices?status=${status}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((invoices) => {
         return {
            code: invoices.code,
            data: invoices.data.map((invoice) => {
               return {
                  invoiceId: invoice.invoiceId,
                  customerId: invoice.customerId,
                  name: invoice.name,
                  address: invoice.address,
                  orderList: invoice.invoiceList.map((invoiceItem) => invoiceItemMapper(invoiceItem)),
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

async function printInvoice(invoiceId) {
   return await fetch(`${api}/invoices/print/${invoiceId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((invoiceInfo) => {
         return {
            code: invoiceInfo.code,
            data: invoicePrintMapper(invoiceInfo.data),
         }
      })
}

async function getStatistical(startDate, endDate) {
   return await fetch(`${api}/invoices/statistical?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((statisticalInfo) => statisticalInfo)
}

export { getAllInvoices, getAllInvoicesByCustomerId, createInvoice, confirmInvoice, printInvoice, getStatistical }
