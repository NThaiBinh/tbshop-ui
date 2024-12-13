import { useNavigate } from 'react-router-dom'
import EditWidthImage from '../../components/EditWidthImage/EditWidthImage'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import SelectOptions from '../SelectOptions/SelectOptions'
import styles from './EditEmployee.module.css'
import { useEffect, useState } from 'react'
import { getAllPositions } from '../../../services/positionServices'

function EditEmployee({ title, employee, setEmployee, nameMessage, handleDropFile, handleImageChange, handleSubmit }) {
   const navigate = useNavigate()
   const [positions, setPositions] = useState([])

   useEffect(() => {
      async function handleGetAllPositions() {
         const positionInfo = await getAllPositions()
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

      handleGetAllPositions()
   }, [])
   function handleExit() {
      navigate(-1)
   }

   return (
      <Modal>
         <EditWidthImage
            title={title}
            image={employee.image}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
         >
            <div>
               <div className={styles.input}>
                  <SelectOptions
                     title="Chức vụ:"
                     isRequire={true}
                     defaultValue={employee.positionId}
                     values={positions}
                     handleOptionChange={(e) => setEmployee({ ...employee, positionId: e.target.value })}
                  />
               </div>
               <div className={styles.input}>
                  <InputValue
                     id="name"
                     title="Tên nhân viên:"
                     value={employee.name}
                     onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                     isRequire={true}
                     message={nameMessage}
                  />
               </div>
               <div className={styles.input}>
                  <InputValue
                     id="birth"
                     title="Ngày sinh:"
                     value={employee?.birth?.split('T')[0] || ''}
                     onChange={(e) => setEmployee({ ...employee, birth: e.target.value })}
                     type="date"
                  />
               </div>
               <div className={styles.input}>
                  <InputValue
                     id="address"
                     title="Địa chỉ"
                     value={employee.address}
                     onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                  />
               </div>
               <div className={styles.input}>
                  <InputValue
                     id="phoneNumber"
                     title="Số điện thoại"
                     value={employee.phoneNumber}
                     onChange={(e) => setEmployee({ ...employee, phoneNumber: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.input}>
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
