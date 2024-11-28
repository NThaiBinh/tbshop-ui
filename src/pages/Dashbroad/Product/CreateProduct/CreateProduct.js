import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditProduct from '../../../components/EditProduct/EditProduct'
import { createProduct, createProductConfiguration } from '../../../../services/productServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import { objProductConfiguration, objProductImages, objProductInfo } from '../objectProduct'
function CreateProduct() {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()
   const [productImages, setProductImages] = useState(objProductImages)
   const [productDetails, setProductDetails] = useState({
      productInfo: objProductInfo,
      productConfiguration: objProductConfiguration,
   })
   const [productColors, setProductColors] = useState([])

   async function handleSubmit() {
      let result
      //Add new product configuration
      if (productDetails.productConfiguration.productId) {
         result = await createProductConfiguration(
            {
               productConfiguration: productDetails.productConfiguration,
            },
            productDetails.productConfiguration.productId,
         )
      } else {
         const formData = new FormData()
         productImages.forEach((productImage) => {
            if (productImage.image) {
               formData.append('productImages', productImage.image, productImage.imageId)
            }
         })

         formData.append('productInfo', JSON.stringify(productDetails.productInfo))
         formData.append('productConfiguration', JSON.stringify(productDetails.productConfiguration))
         productColors.forEach((productColor) => formData.append('productColors', JSON.stringify(productColor)))
         result = await createProduct(formData)
      }
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Thêm sản phẩm thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'errer', 'Thêm sản phẩm thất bại!'))
      }
   }

   return (
      <EditProduct
         isCreate={true}
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

export default CreateProduct
