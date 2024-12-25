import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import { setShowToast } from '../../../store/actions'
import { deleteManufac, getAllManufacs } from '../../../services/manufacturerServices'
import exportExcel from '../../../utils/exportExcel'

function Manufacturer() {
   const location = useLocation()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [manufactuers, setManufacturers] = useState([])

   async function getAllManufacsHandle(page) {
      const manufacturers = await getAllManufacs(page)
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
         dispatch(setShowToast(true, 'error', 'Xóa thất bại!'))
      }
   }

   useEffect(() => {
      getAllManufacsHandle(state.page)
   }, [state.page, state.isShowToast])

   function handlePrint() {
      exportExcel(
         manufactuers.map((manufac) => {
            return {
               'Mã nhà sản xuất': manufac.manufacId,
               'Tên nhà sản xuất': manufac.name,
               'Địa chỉ nhà sản xuất': manufac.address,
            }
         }),
      )
   }
   return (
      <Fragment>
         {manufactuers.length > 0 ? (
            <TableInfoDashbroad
               title="THÔNG TIN NHÀ SẢN XUẤT"
               image={true}
               pagination={false}
               print={true}
               handlePrint={handlePrint}
            >
               {manufactuers.map((manufactuer, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={manufactuer.manufacId}
                     name={manufactuer.name}
                     image={manufactuer.image}
                     handleEdit={() => handleEdit(manufactuer.manufacId)}
                     handleDelete={() => handleDelete(manufactuer.manufacId)}
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
