import { api } from '.'
import { productDetailMapper, productImageMapper, productInfoMapper, productMapper } from '../utils/productMapper'

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
   return await fetch(`${api}/products/edit?productId=${productId}&productConfigurationId=${productConfigurationId}`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((response) => response.json())
      .then((productDetails) => {
         console.log(productDetails)
         return {
            code: productDetails.code,
            data: {
               productImages: productDetails.data.productImages.map((productImage) => productImageMapper(productImage)),
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
         return {
            code: productInfo.code,
            data: {
               productImages: productInfo.data.productImages.map((productImage) => productImageMapper(productImage)),
               productInfo: productMapper(productInfo.data.productInfo),
            },
         }
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
}
