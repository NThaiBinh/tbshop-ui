import { useContext } from 'react'
import TabelBodyDashbroad from '../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../components/TableInfoDashbroad/TableInfoDashbroad'
import cssEmployee from './Employee.module.css'
import StoreContext from '../../store/StoreContext'
import { getAllEmployees } from '../../services/employeeServices'
import { setInfoEmployee } from '../../store/actions'

function Employee() {
   const [state, dispatch] = useContext(StoreContext)

   async function getAllEmployeHandle(page) {
      const employees = await getAllEmployees(page)
      dispatch(setInfoEmployee(employees))
   }
   return (
      <TableInfoDashbroad>
         {state.infoEmployees?.map((employee, index) => (
            <TabelBodyDashbroad
               key={index}
               id={employee.MANV}
               name={employee.TENNV}
               updateAt={employee.NGAYCAPNHAT}
               objectHandle="employees"
            />
         ))}
      </TableInfoDashbroad>
   )
}

export default Employee
