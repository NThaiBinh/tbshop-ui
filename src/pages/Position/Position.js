import { useNavigate } from 'react-router-dom'
import { useEffect, useContext, Fragment } from 'react'
import TabelBodyDashbroad from '../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../components/TableInfoDashbroad/TableInfoDashbroad'
import cssPosition from './Position.module.css'
import StoreContext from '../../store/StoreContext'
import { getAllPosition } from '../../services/positionServices'
import { setPositionInfo } from '../../store/actions'
import BlankPage from '../BlankPage/BlankPage'

function Position() {
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)

   async function getAllPositionHandle(page) {
      const positions = await getAllPosition(page)
      dispatch(setPositionInfo(positions))
      // if (positions.message) {
      //    navigate('/login')
      // } else {
      //dispatch(setPositionInfo(positions))
      // }
   }

   useEffect(() => {
      getAllPositionHandle(state.page)
   }, [state.page])

   return (
      <Fragment>
         {state.positionInfo.length > 0 ? (
            <TableInfoDashbroad title="THÔNG TIN CHỨC VỤ">
               {state.positionInfo?.map((position, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={position.MACV}
                     name={position.TENCV}
                     updateAt={position.NGAYCAPNHAT}
                     objectHandle="positions"
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
