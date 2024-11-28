import { useContext, useEffect, useState } from 'react'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import { deleteEmployee, getAllEmployees } from '../../../services/employeeServices'
import StoreContext from '../../../store/StoreContext'
import { setShowToast } from '../../../store/actions'
import { useNavigate } from 'react-router-dom'

function Employee() {
   const [employees, setEmployees] = useState([])
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetAllEmployee() {
         const employeeInfo = await getAllEmployees()
         if (employeeInfo.code === 'SS') {
            setEmployees(employeeInfo.data)
         }
      }
      handleGetAllEmployee()
   }, [state.isShowToast])

   function handleEdit(employeeId) {
      navigate(`/dashbroad/employees/edit/${employeeId}`)
   }

   async function handleDelete(employeeId) {
      const result = await deleteEmployee(employeeId)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa nhân viên thành công!'))
      }
   }

   return (
      <TableInfoDashbroad title="THÔNG TIN NHÂN VIÊN" updatedAt={true} image={true}>
         {employees.map((employee, index) => (
            <TabelBodyDashbroad
               key={index}
               id={employee.userId}
               image={employee.image}
               name={employee.name}
               updatedAt={employee.updatedAt}
               objectHandle="employees"
               handleEdit={() => handleEdit(employee.userId)}
               handleDelete={() => handleDelete(employee.userId)}
            />
         ))}
      </TableInfoDashbroad>
   )
}

export default Employee
