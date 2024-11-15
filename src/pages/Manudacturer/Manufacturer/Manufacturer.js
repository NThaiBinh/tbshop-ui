import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import cssManufacturer from './Manufacturer.module.css'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import { setLocation, setShowToast } from '../../../store/actions'
import { deleteManufac, getAllManufacInPage } from '../../../services/manufacturerServices'

function Manufacturer() {
   const location = useLocation()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [manufactuers, setManufacturers] = useState([])

   async function getAllManufacInPageHandle(page) {
      const manufacturers = await getAllManufacInPage(page)
      if (manufacturers.code === 'SS') {
         setManufacturers(manufacturers.data)
      }
   }

   function handleEdit(manufacId) {
      navigate(`/dashbroad/manufacturers/edit/${manufacId}`)
   }
   async function handleDelete(manufacId) {
      const result = await deleteManufac(manufacId)
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa thành công!'))
         navigate(`/dashbroad/manufacturers/page/1`)
      } else {
         dispatch(setShowToast(true, 'success', 'Xóa thất bại!'))
      }
   }
   useEffect(() => {
      // navigate(`/dashbroad/manufacturers/page/${state.page}`)
      getAllManufacInPageHandle(state.page)
   }, [state.page, state.isShowToast])

   useEffect(() => {
      dispatch(setLocation(location.pathname))
   }, [])

   return (
      <Fragment>
         {manufactuers.length > 0 ? (
            <TableInfoDashbroad title="THÔNG TIN NHÀ SẢN XUẤT" image={true} pagination={true}>
               {manufactuers.map((manufactuer, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={manufactuer.manufacId}
                     name={manufactuer.name}
                     image={manufactuer.manufacImage}
                     updateAt={manufactuer.updateAt}
                     handleEdit={() => handleEdit(manufactuer.MANSX)}
                     handleDelete={() => handleDelete(manufactuer.MANSX)}
                  />
               ))}
            </TableInfoDashbroad>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Manufacturer
