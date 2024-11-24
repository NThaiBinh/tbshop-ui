import { useContext, useEffect, useState } from 'react'
import StoreContext from '../../../store/StoreContext'
import EditCategory from '../../components/EditCategory/EditCategory'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, updateCategory } from '../../../services/categoryServices'
import { setShowToast } from '../../../store/actions'
function UpdateCategory() {
   const navigate = useNavigate()
   const params = useParams()
   const [state, dispatch] = useContext(StoreContext)
   const [name, setName] = useState('')

   async function getCategoryInfo(categoryId) {
      if (categoryId) {
         const category = await getCategoryById(categoryId)
         if (category) {
            setName(category.data.TENDM)
         }
      }
   }

   async function handleSubmit() {
      const result = await updateCategory({ categoryId: params.categoryId, categoryInfo: { name } })
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa danh mục thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa danh mục thất bại!'))
      }
   }
   function handleExit() {
      navigate(-1)
   }

   useEffect(() => {
      getCategoryInfo(params.categoryId)
   }, [params.categoryId])
   return (
      <EditCategory
         title="Cập nhật danh mục"
         titleName="Tên danh mục"
         name={name}
         setName={setName}
         handleSubmit={handleSubmit}
         handleExit={handleExit}
      />
   )
}

export default UpdateCategory
