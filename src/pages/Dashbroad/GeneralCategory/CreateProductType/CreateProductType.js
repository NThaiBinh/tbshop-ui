import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreContext from '../../../../store/StoreContext'
import EditCategory from '../../../components/EditCategory/EditCategory'
import { setShowToast } from '../../../../store/actions'
import { createProductType } from '../../../../services/productTypeServices'

function CreateProductType() {
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [name, setName] = useState('')
   const [nameMessage, setNameMessage] = useState('')
   async function handleSubmit() {
      if (!name) {
         dispatch(setShowToast(true, 'error', 'Thêm danh mục thất bại!'))
         setNameMessage('Tên danh mục không được bỏ trống!')
      } else {
         const result = await createProductType({ name })
         if (result === 'SS') {
            dispatch(setShowToast(true, 'success', 'Thêm danh mục thành công!'))
            navigate(-1)
         }
      }
   }

   function handleExit() {
      navigate(-1)
   }
   return (
      <EditCategory
         title="Thêm loại sản phẩm"
         titleName="Tên loại sản phẩm:"
         name={name}
         setName={setName}
         handleSubmit={handleSubmit}
         handleExit={handleExit}
      />
   )
}

export default CreateProductType
