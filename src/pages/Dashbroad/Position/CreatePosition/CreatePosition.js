import { useContext, useState } from 'react'
import EditPosition from '../../../components/EditPosition/EditPosition'
import { createPosition } from '../../../../services/positionServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import { useNavigate } from 'react-router-dom'

function CreatePosition() {
   const [name, setName] = useState('')
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   async function handleSubmit() {
      const result = await createPosition({ name })
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Thêm chức vụ thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Thêm chức vụ thất bại!'))
      }
   }
   return <EditPosition title="Thông tin chức vụ" name={name} setName={setName} handleSubmit={handleSubmit} />
}

export default CreatePosition
