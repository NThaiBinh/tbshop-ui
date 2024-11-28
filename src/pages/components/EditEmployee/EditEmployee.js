import { useNavigate } from 'react-router-dom'
import EditWidthImage from '../../components/EditWidthImage/EditWidthImage'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import SelectOptions from '../SelectOptions/SelectOptions'
import cssEditEmployee from './EditEmployee.module.css'
import { useEffect, useState } from 'react'
import { getAllPosition } from '../../../services/positionServices'

function EditEmployee({ title, employee, setEmployee, nameMessage, handleDropFile, handleImageChange, handleSubmit }) {
   const navigate = useNavigate()
   const [positions, setPositions] = useState([])

   useEffect(() => {
      async function handleGetAllPosition() {
         const positionInfo = await getAllPosition()
         if (positionInfo.code === 'SS') {
            setPositions(
               positionInfo.data.map((position) => {
                  return {
                     valueMember: position.positionId,
                     displayMember: position.name,
                  }
               }),
            )
         }
      }

      handleGetAllPosition()
   }, [])
   function handleExit() {
      navigate(-1)
   }

   return (
      <Modal>
         <EditWidthImage
            title={title}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
         >
            <div>
               <div className={cssEditEmployee.input}>
                  <SelectOptions
                     title="Chức vụ:"
                     isRequire={true}
                     values={positions}
                     handleOptionChange={(e) => setEmployee({ ...employee, positionId: e.target.value })}
                  />
               </div>
               <div className={cssEditEmployee.input}>
                  <InputValue
                     id="name"
                     title="Tên nhân viên:"
                     value={employee.name}
                     onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                     isRequire={true}
                     message={nameMessage}
                  />
               </div>
               <div className={cssEditEmployee.input}>
                  <InputValue
                     id="birth"
                     title="Ngày sinh:"
                     value={employee.birth}
                     onChange={(e) => setEmployee({ ...employee, birth: e.target.value })}
                     type="date"
                  />
               </div>
               <div className={cssEditEmployee.input}>
                  <InputValue
                     id="address"
                     title="Địa chỉ"
                     value={employee.address}
                     onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                  />
               </div>
               <div className={cssEditEmployee.input}>
                  <InputValue
                     id="phoneNumber"
                     title="Số điện thoại"
                     value={employee.phoneNumber}
                     onChange={(e) => setEmployee({ ...employee, phoneNumber: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={cssEditEmployee.input}>
                  <InputValue
                     id="email"
                     title="Email:"
                     value={employee.email}
                     onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                     isRequire={true}
                  />
               </div>
            </div>
         </EditWidthImage>
      </Modal>
   )
}

export default EditEmployee
