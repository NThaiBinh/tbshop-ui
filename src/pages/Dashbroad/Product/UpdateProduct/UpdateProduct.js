import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import { getProductEdit, updateProduct } from '../../../../services/productServices'
import EditProduct from '../../../components/EditProduct/EditProduct'
import { objProductConfiguration, objProductImages, objProductInfo } from '../objectProduct'

function UpdateProduct() {
   const navigate = useNavigate()
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const productId = queryParams.get('productId')
   const productConfigurationId = queryParams.get('productConfigurationId')
   const [state, dispatch] = useContext(StoreContext)
   const [productImages, setProductImages] = useState(objProductImages)
   const [productDetails, setProductDetails] = useState({
      productInfo: objProductInfo,
      productConfiguration: objProductConfiguration,
   })
   const [productColors, setProductColors] = useState([])

   async function handleGetProductDetails(productId, productConfigurationId) {
      const productDetailsInfo = await getProductEdit(productId, productConfigurationId)

      if (productDetailsInfo.code === 'SS') {
         const { productImages, productDetails, productColors } = productDetailsInfo.data
         setProductImages(productImages)
         setProductDetails(productDetails)
         setProductColors(productColors)
      }
   }
   useEffect(() => {
      handleGetProductDetails(productId, productConfigurationId)
   }, [productId, productConfigurationId])

   async function handleSubmit() {
      const formData = new FormData()
      productImages.forEach((productImage) => {
         if (typeof productImage.image === 'object') {
            formData.append('productImages', productImage.image, productImage.imageId)
         }
      })
      formData.append('productInfo', JSON.stringify(productDetails.productInfo))
      formData.append('productConfiguration', JSON.stringify(productDetails.productConfiguration))
      productColors.forEach((productColor) => formData.append('productColors', JSON.stringify(productColor)))

      const result = await updateProduct({ productId, productConfigurationId, formData })
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa sản phẩm thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'errer', 'Sửa sản phẩm thất bại!'))
      }
   }

   return (
      <EditProduct
         productImages={productImages}
         setProductImages={setProductImages}
         productDetails={productDetails}
         setProductDetails={setProductDetails}
         productColors={productColors}
         setProductColors={setProductColors}
         handleSubmit={handleSubmit}
      />
   )
}

export default UpdateProduct
