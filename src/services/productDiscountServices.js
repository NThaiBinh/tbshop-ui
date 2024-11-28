import { api } from '.'
import { productDiscountMapper } from '../utils/productDiscountMapper'

async function getAllProductDiscountsInPage(page) {
   return await fetch(`${api}/product-discounts/?page=${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productDiscounts) => {
         return {
            code: productDiscounts.code,
            data: productDiscounts.data.map((productDiscount) => productDiscountMapper(productDiscount)),
         }
      })
}

async function getAllProductDiscountsValid() {
   return await fetch(`${api}/product-discounts/valid/all`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productDiscounts) => {
         return {
            code: productDiscounts.code,
            data: productDiscounts.data.map((productDiscount) => productDiscountMapper(productDiscount)),
         }
      })
}

async function getAllProductDiscountsValidByProductId(productId) {
   return await fetch(`${api}/product-discounts/valid/?productId=${productId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productDiscounts) => {
         return {
            code: productDiscounts.code,
            data: productDiscounts.data.map((productDiscount) => productDiscountMapper(productDiscount)),
         }
      })
}

async function getAllProductPosterDiscounts() {
   return await fetch(`${api}/product-discounts/posters`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productPosterDiscounts) => {
         return {
            code: productPosterDiscounts.code,
            data: productPosterDiscounts.data.map((productPosterDiscount) => productPosterDiscount.ANHKM),
         }
      })
}

async function createProductDiscount(productDiscountInfo) {
   return await fetch(`${api}/product-discounts/create`, {
      method: 'POST',
      credentials: 'include',
      body: productDiscountInfo,
   })
      .then((response) => response.json())
      .then((result) => result.code)
}

export {
   getAllProductDiscountsInPage,
   getAllProductPosterDiscounts,
   getAllProductDiscountsValid,
   getAllProductDiscountsValidByProductId,
   createProductDiscount,
}
