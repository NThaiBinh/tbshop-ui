import { api } from '.'
import { storewideDiscountMapper } from '../utils/storewideDiscountMapper'

async function getAllStorewideDiscountsInPage(page) {
   return await fetch(`${api}/storewide-discounts/?page=${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((storewideDiscounts) => {
         return {
            code: storewideDiscounts.code,
            data: storewideDiscounts.data.map((storewideDiscount) => storewideDiscountMapper(storewideDiscount)),
         }
      })
}

async function getAllStorewideDiscountsValid() {
   return await fetch(`${api}/storewide-discounts/valid`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((storewideDiscounts) => {
         return {
            code: storewideDiscounts.code,
            data: storewideDiscounts.data.map((storewideDiscount) => storewideDiscountMapper(storewideDiscount)),
         }
      })
}

async function getAllStorewidePosterDiscounts() {
   return await fetch(`${api}/storewide-discounts/panels`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((storewideDiscounts) => {
         return {
            code: storewideDiscounts.code,
            data: storewideDiscounts.data.map((storewidePosterDiscount) => storewidePosterDiscount.ANHKM),
         }
      })
}

async function createStorewideDiscount(StorewideDiscountInfo) {
   return await fetch(`${api}/storewide-discounts/create`, {
      method: 'POST',
      credentials: 'include',
      body: StorewideDiscountInfo,
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

export {
   getAllStorewideDiscountsInPage,
   getAllStorewideDiscountsValid,
   getAllStorewidePosterDiscounts,
   createStorewideDiscount,
}
