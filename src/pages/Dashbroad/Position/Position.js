import { Fragment, useContext, useEffect, useState } from 'react'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import { deletePosition, getAllPosition } from '../../../services/positionServices'
import StoreContext from '../../../store/StoreContext'
import { useNavigate } from 'react-router-dom'
import { setShowToast } from '../../../store/actions'

function Position() {
   const [state, dispatch] = useContext(StoreContext)
   const [positions, setPositions] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetAllPositions() {
         const positionInfo = await getAllPosition()
         if (positionInfo.code === 'SS') {
            setPositions(positionInfo.data)
         }
      }

      handleGetAllPositions()
   }, [state.isShowToast])

   function handleEdit(positionId) {
      navigate(`/dashbroad/positions/edit/${positionId}`)
   }

   async function handleDelete(positonId) {
      const result = await deletePosition(positonId)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa chức vụ thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Xóa chức vụ thất bại!'))
      }
   }

   return (
      <Fragment>
         {positions.length > 0 ? (
            <TableInfoDashbroad title="THÔNG TIN CHỨC VỤ">
               {positions.map((position, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={position.positionId}
                     name={position.name}
                     objectHandle="positions"
                     handleEdit={() => handleEdit(position.positionId)}
                     handleDelete={() => handleDelete(position.positionId)}
                  />
               ))}
            </TableInfoDashbroad>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Position
