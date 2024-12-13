import { useContext, useEffect, useState } from 'react'
import EditEmployee from '../../../components/EditEmployee/EditEmployee'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, updateEmployee } from '../../../../services/employeeServices'
import { setShowToast } from '../../../../store/actions'
import StoreContext from '../../../../store/StoreContext'
import { objEmployee } from '../objEmployee'

function UpdateEmployee() {
   const [state, dispatch] = useContext(StoreContext)
   const [employee, setEmployee] = useState(objEmployee)
   const { employeeId } = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetEmployeeById(employeeId) {
         const employeeInfo = await getEmployeeById(employeeId)
         if (employeeInfo.code === 'SS') {
            setEmployee(employeeInfo.data)
         }
      }

      handleGetEmployeeById(employeeId)
   }, [employeeId])

   async function handleSubmit() {
      const formData = new FormData()
      formData.append('positionId', employee.positionId)
      formData.append('name', employee.name)
      formData.append('image', employee.image)
      formData.append('birth', employee.birth)
      formData.append('address', employee.address)
      formData.append('phoneNumber', employee.phoneNumber)
      formData.append('email', employee.email)
      const result = await updateEmployee(employeeId, formData)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Sửa nhân viên thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa nhân viên thất bại!'))
      }
   }

   function handleDropFile(id, file) {
      setEmployee({ ...employee, image: file })
   }

   function handleImageChange(id, file) {
      setEmployee({ ...employee, image: file })
   }

   return (
      <EditEmployee
         title="Sửa nhân viên"
         employee={employee}
         setEmployee={setEmployee}
         handleSubmit={handleSubmit}
         handleDropFile={handleDropFile}
         handleImageChange={handleImageChange}
      />
   )
}

export default UpdateEmployee
