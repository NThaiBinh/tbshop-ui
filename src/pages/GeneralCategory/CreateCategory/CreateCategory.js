import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreConText from '../../../store/StoreContext'
import EditCategory from '../../components/EditCategory/EditCategory'
import { createCategory } from '../../../services/categoryServices'
import { setShowToast } from '../../../store/actions'

function CreateCategory() {
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreConText)
   const [name, setName] = useState('')
   const [nameMessage, setNameMessage] = useState('')

   async function handleSubmit() {
      if (!name) {
         dispatch(setShowToast(true, 'error', 'Thêm danh mục thất bại!'))
         setNameMessage('Tên danh mục không được bỏ trống!')
      } else {
         const result = await createCategory({ name })
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
         title="Thêm danh mục"
         titleName="Tên danh mục:"
         name={name}
         setName={setName}
         nameMessage={nameMessage}
         handleSubmit={handleSubmit}
         handleExit={handleExit}
      />
   )
}

export default CreateCategory
