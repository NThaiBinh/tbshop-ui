import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../../components/Layouts/components/Modal/Modal'
import EditWithoutImage from '../../../components/EditWithoutImage/EditWithoutImage'
import SelectOptions from '../../../components/SelectOptions/SelectOptions'
import { getAllPositions } from '../../../../services/positionServices'
import styles from './CreateAccountEmployee.module.css'
import InputValue from '../../../components/InputValue/InputValue'
import { register } from '../../../../services/authServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'

function CreateAccountEmployee() {
   const [state, dispatch] = useContext(StoreContext)
   const [positions, setPositions] = useState([])
   const navigate = useNavigate()
   const [employeeInfo, setEmployeeInfo] = useState({
      positionId: '',
      name: '',
      phoneNumber: '',
      email: '',
      userName: '',
      password: '',
   })

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

   async function handleSubmit() {
      const result = await register({ ...employeeInfo, accountType: 'employee' })
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Tạo tài khoản thành công!'))
         navigate(-1)
      }
   }

   return (
      <Modal>
         <EditWithoutImage title="Tạo tài khoản nhân viên" handleExit={() => navigate(-1)} handleSubmit={handleSubmit}>
            <div className={styles.wrapper}>
               <div className={styles.wrapperInput}>
                  <SelectOptions
                     title="Chức vụ:"
                     values={positions}
                     isRequire={true}
                     handleOptionChange={(e) => setEmployeeInfo({ ...employeeInfo, positionId: e.target.value })}
                  />
               </div>
               <div className={styles.wrapperInput}>
                  <InputValue
                     title="Tên nhân viên:"
                     values={employeeInfo.name}
                     onChange={(e) => setEmployeeInfo({ ...employeeInfo, name: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.wrapperInput}>
                  <InputValue
                     title="Số điện thoại:"
                     values={employeeInfo.phoneNumber}
                     onChange={(e) => setEmployeeInfo({ ...employeeInfo, phoneNumber: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.wrapperInput}>
                  <InputValue
                     title="Email:"
                     values={employeeInfo.email}
                     onChange={(e) => setEmployeeInfo({ ...employeeInfo, email: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.wrapperInput}>
                  <InputValue
                     title="Tên đăng nhập:"
                     values={employeeInfo.userName}
                     onChange={(e) => setEmployeeInfo({ ...employeeInfo, userName: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.wrapperInput}>
                  <InputValue
                     title="Mật khẩu:"
                     values={employeeInfo.password}
                     onChange={(e) => setEmployeeInfo({ ...employeeInfo, password: e.target.value })}
                     isRequire={true}
                  />
               </div>
            </div>
         </EditWithoutImage>
      </Modal>
   )
}

export default CreateAccountEmployee
