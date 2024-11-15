import { useNavigate, useParams } from 'react-router-dom'
import EditCategory from '../../components/EditCategory/EditCategory'
import { getProductTypeById, updateProductType } from '../../../services/productTypeServices'
import { useContext, useEffect, useState } from 'react'
import StoreContext from '../../../store/StoreContext'
import { setShowToast } from '../../../store/actions'

function UpdateProductType() {
   const params = useParams()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [name, setName] = useState('')

   async function getProductTypeInfo(productTypeId) {
      if (productTypeId) {
         const productType = await getProductTypeById(productTypeId)
         if (productType.code === 'SS') {
            setName(productType.data.TENLOAISP)
         }
      }
   }

   async function handleSubmit() {
      const result = await updateProductType({ productTypeId: params.productTypeId, productTypeInfo: { name } })
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa loại sản phẩm thành công!'))
         navigate(state.previousPath)
      } else {
         dispatch(setShowToast(true, 'success', 'Sửa loại sản phẩm thất bại!'))
      }
   }
   function handleExit() {
      navigate(state.previousPath)
   }

   useEffect(() => {
      getProductTypeInfo(params.productTypeId)
   }, [params.productTypeId])
   return (
      <EditCategory
         title="Sửa loại sản phẩm"
         titleName="Tên loại sản phẩm:"
         name={name}
         setName={setName}
         handleSubmit={handleSubmit}
         handleExit={handleExit}
      />
   )
}

export default UpdateProductType
