import { api } from '.'
import {
   productColorsMapper,
   productDetailMapper,
   productImageMapper,
   productInfoMapper,
   productMapper,
} from '../utils/productMapper'

async function getAllProductsInfo(page) {
   return await fetch(`${api}/products?page=${page}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((products) => {
         return {
            code: products.code,
            data: products.data.map((product) => productInfoMapper(product)),
         }
      })
}

async function filterPrtoduct(categoryId, manufacId, productTypeId, page) {
   let queryParams = ''

   if (categoryId) {
      queryParams += `categoryId=${categoryId}&`
   }

   if (manufacId) {
      queryParams += `manufacId=${manufacId}&`
   }

   if (productTypeId) {
      queryParams += `productTypeId=${productTypeId}&`
   }

   if (page) {
      queryParams += `page=${page}`
   }

   if (queryParams.charAt(queryParams.length - 1) === '&') {
   }

   return await fetch(
      `${api}/products/filter?${
         queryParams.charAt(queryParams.length - 1) === '&' ? queryParams.slice(0, -1) : queryParams
      }`,
      {
         method: 'GET',
         credentials: 'include',
      },
   )
      .then((response) => response.json())
      .then((products) => {
         return {
            code: products.code,
            data: products.data.map((product) => productInfoMapper(product)),
         }
      })
}

async function createProduct(productInfo) {
   return await fetch(`${api}/products/create`, {
      method: 'POST',
      credentials: 'include',
      body: productInfo,
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function createProductConfiguration(productConfiguration, productId) {
   return await fetch(`${api}/products/create-product-configuration/${productId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(productConfiguration),
   })
      .then((response) => response.json())
      .then((result) => result)
}

async function getProductDetails(productId, productConfigurationId) {
   return await fetch(
      `${api}/products/details?productId=${productId}&productConfigurationId=${productConfigurationId}`,
      {
         method: 'GET',
         credentials: 'include',
      },
   )
      .then((response) => response.json())
      .then((productDetails) => {
         return {
            code: productDetails.code,
            data: {
               productImages: productDetails.data.productImages.map((productImage) => productImageMapper(productImage)),
               productColors: productDetails.data.productColors.map((productColor) =>
                  productColorsMapper(productColor),
               ),
               productDetails: productDetailMapper({
                  productInfo: productDetails.data.productInfo,
                  productConfiguration: productDetails.data.productConfiguration,
               }),
            },
         }
      })
}

async function getProductEdit(productId, productConfigurationId) {
   return await fetch(`${api}/products/edit?productId=${productId}&productConfigurationId=${productConfigurationId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productDetails) => {
         return {
            code: productDetails.code,
            data: {
               productImages: productDetails.data.productImages.map((productImage) => productImageMapper(productImage)),
               productColors: productDetails.data.productColors.map((productColor) =>
                  productColorsMapper(productColor),
               ),
               productDetails: productDetailMapper({
                  productInfo: productDetails.data.productInfo,
                  productConfiguration: productDetails.data.productConfiguration,
               }),
            },
         }
      })
}

async function getProductInfoWidthoutConfig(productId) {
   return await fetch(`${api}/products/edit-widthout-config/${productId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productInfo) => {
         if (productInfo.code === 'SS') {
            return {
               code: productInfo.code,
               data: {
                  productImages: productInfo.data.productImages.map((productImage) => productImageMapper(productImage)),
                  productInfo: productMapper(productInfo.data.productInfo),
               },
            }
         } else return productInfo
      })
}

async function updateProduct({ productId, productConfigurationId, formData }) {
   return await fetch(
      `${api}/products/update?productId=${productId}&productConfigurationId=${productConfigurationId}`,
      {
         method: 'PUT',
         credentials: 'include',
         body: formData,
      },
   )
      .then((response) => response.json())
      .then((result) => result)
}

async function deleteProduct(productId) {
   return await fetch(`${api}/products/delete/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((result) => result)
}

export {
   getAllProductsInfo,
   createProduct,
   createProductConfiguration,
   getProductDetails,
   getProductInfoWidthoutConfig,
   updateProduct,
   deleteProduct,
   getProductEdit,
   filterPrtoduct,
}
