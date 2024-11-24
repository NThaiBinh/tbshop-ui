import { useState } from 'react'
import TabelBodyDashbroad from '../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../components/TableInfoDashbroad/TableInfoDashbroad'

function Employee() {
   const [employees, setEmployees] = useState()
   return (
      <TableInfoDashbroad>
         {employees.map((employee, index) => (
            <TabelBodyDashbroad
               key={index}
               id={employee.MANV}
               name={employee.TENNV}
               updatedAt={employee.NGAYCAPNHAT}
               objectHandle="employees"
            />
         ))}
      </TableInfoDashbroad>
   )
}

export default Employee
