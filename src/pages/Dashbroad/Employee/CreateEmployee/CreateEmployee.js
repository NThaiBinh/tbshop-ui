import { useContext, useState } from 'react'
import EditEmployee from '../../../components/EditEmployee/EditEmployee'
import { objEmployee } from '../objEmployee'
import { createEmployee } from '../../../../services/employeeServices'
import StoreContext from '../../../../store/StoreContext'
import { useNavigate } from 'react-router-dom'
import { setShowToast } from '../../../../store/actions'

function CreateEmployee() {
   const [state, dispatch] = useContext(StoreContext)
   const [employee, setEmployee] = useState(objEmployee)
   const navigate = useNavigate()

   function handleDropFile(id, file) {
      setEmployee({ ...employee, image: file })
   }

   function handleImageChange(id, file) {
      setEmployee({ ...employee, image: file })
   }

   async function handleSubmit() {
      const formData = new FormData()
      formData.append('positionId', employee.positionId)
      formData.append('name', employee.name)
      formData.append('image', employee.image)
      formData.append('birth', employee.birth)
      formData.append('address', employee.address)
      formData.append('phoneNumber', employee.address)
      formData.append('email', employee.email)
      const result = await createEmployee(formData)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Thêm nhân viên thành công!'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Thêm nhân viên thất bại!'))
      }
   }
   return (
      <EditEmployee
         title="Thêm nhân viên"
         employee={employee}
         setEmployee={setEmployee}
         handleSubmit={handleSubmit}
         handleDropFile={handleDropFile}
         handleImageChange={handleImageChange}
      />
   )
}

export default CreateEmployee
