import { useContext, useEffect, useState } from 'react'
import EditPosition from '../../../components/EditPosition/EditPosition'
import { getPositionById, updatePosition } from '../../../../services/positionServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import { useNavigate, useParams } from 'react-router-dom'

function UpdatePosition() {
   const { positionId } = useParams()
   const [name, setName] = useState('')
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetPositionById(positionId) {
         const positionInfo = await getPositionById(positionId)
         if (positionInfo.code === 'SS') {
            setName(positionInfo.data.name)
         }
      }

      handleGetPositionById(positionId)
   }, [positionId])

   async function handleSubmit() {
      const result = await updatePosition({ positionId, name })
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa chức vụ thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa chức vụ thất bại!'))
      }
   }
   return <EditPosition title="Thông tin chức vụ" name={name} setName={setName} handleSubmit={handleSubmit} />
}

export default UpdatePosition
