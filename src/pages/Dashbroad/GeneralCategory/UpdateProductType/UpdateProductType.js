import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditCategory from '../../../components/EditCategory/EditCategory'
import { getProductTypeById, updateProductType } from '../../../../services/productTypeServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'

function UpdateProductType() {
   const { productTypeId } = useParams()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [name, setName] = useState('')

   async function handleSubmit() {
      const result = await updateProductType({ productTypeId: productTypeId, productTypeInfo: { name } })
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa loại sản phẩm thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa loại sản phẩm thất bại!'))
      }
   }

   useEffect(() => {
      async function getProductTypeInfo(productTypeId) {
         if (productTypeId) {
            const productType = await getProductTypeById(productTypeId)
            if (productType.code === 'SS') {
               setName(productType.data.name)
            }
         }
      }

      getProductTypeInfo(productTypeId)
   }, [productTypeId])
   return (
      <EditCategory
         title="Sửa loại sản phẩm"
         titleName="Tên loại sản phẩm:"
         name={name}
         setName={setName}
         handleSubmit={handleSubmit}
      />
   )
}

export default UpdateProductType
