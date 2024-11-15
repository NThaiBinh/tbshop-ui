import { useContext, useState } from 'react'
import EditProduct from '../../components/EditProduct/EditProduct'
import { createProduct, createProductConfiguration } from '../../../services/productServices'
import StoreContext from '../../../store/StoreContext'
import { useNavigate } from 'react-router-dom'
import { setShowToast } from '../../../store/actions'
import { objProductConfiguration, objProductImages, objProductInfo } from '../objectProduct'
function CreateProduct() {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()
   const [productImages, setProductImages] = useState(objProductImages)
   const [productDetails, setProductDetails] = useState({
      productInfo: objProductInfo,
      productConfiguration: objProductConfiguration,
   })

   async function handleSubmit() {
      let result
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
         console.log(productDetails)
         formData.append('productInfo', JSON.stringify(productDetails.productInfo))
         formData.append('productConfiguration', JSON.stringify(productDetails.productConfiguration))
         result = await createProduct(formData)
      }
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Thêm sản phẩm thành công!'))
         navigate(state.previousPath)
      } else {
         dispatch(setShowToast(true, 'errer', 'Thêm sản phẩm thất bại!'))
      }
   }

   console.log(productDetails.productInfo)
   return (
      <EditProduct
         isCreate={true}
         productImages={productImages}
         setProductImages={setProductImages}
         productDetails={productDetails}
         setProductDetails={setProductDetails}
         handleSubmit={handleSubmit}
      />
   )
}

export default CreateProduct
