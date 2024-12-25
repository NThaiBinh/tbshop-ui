import { useContext, useEffect, useState } from 'react'
import Modal from '../../components/Layouts/components/Modal/Modal'
import EditWidthImage from '../components/EditWidthImage/EditWidthImage'
import InputValue from '../components/InputValue/InputValue'
import styles from './Profile.module.css'
import { useNavigate } from 'react-router-dom'
import { updateCustomer } from '../../services/customerServices'
import StoreContext from '../../store/StoreContext'
import { setIsUserUpdate, setShowToast } from '../../store/actions'
import UserInfo from '../../components/Layouts/components/UserInfo/UserInfo'

function Profile() {
   const [userInfo, setUserInfo] = useState({})
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])
   function handleDropFile(id, file) {
      setUserInfo({ ...userInfo, image: file })
   }
   function handleImageChange(id, file) {
      setUserInfo({ ...userInfo, image: file })
   }
   async function handleSubmit() {
      const formData = new FormData()
      formData.append('customerImage', userInfo.image)
      formData.append('name', userInfo.name)
      formData.append('birth', userInfo.birth)
      formData.append('address', userInfo.address)
      formData.append('phoneNumber', userInfo.phoneNumber)
      formData.append('email', userInfo.email)
      const result = await updateCustomer(userInfo.userId, formData)
      if (result.code === 'SS') {
         userInfo.image = userInfo.image && URL.createObjectURL(userInfo.image)
         localStorage.setItem('userInfo', JSON.stringify(userInfo))
         dispatch(setIsUserUpdate(true))
         dispatch(setShowToast(true, 'success', 'Cập nhật thông tin thành công!'))
         navigate(-1)
      }
   }

   function handleExit() {
      navigate(-1)
   }

   return (
      <Modal>
         <EditWidthImage
            title="Thông tin của bạn"
            image={userInfo.image}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
         >
            <div className={styles.wrapper}>
               <InputValue
                  id="name"
                  title="Tên:"
                  isRequire={true}
                  value={userInfo.name || ''}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
               />
               <InputValue
                  id="birth"
                  title="Ngày sinh:"
                  value={userInfo.birth?.split('T')[0] || ''}
                  type="date"
                  onChange={(e) => setUserInfo({ ...userInfo, birth: e.target.value })}
               />
               {userInfo.userType === 'employee' && (
                  <InputValue
                     id="address"
                     title="Địa chỉ:"
                     value={userInfo.address}
                     onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  />
               )}
               <InputValue
                  id="phoneNumber"
                  title="Số điện thoại:"
                  value={userInfo.phoneNumber || ''}
                  onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}
               />
               <InputValue
                  id="name"
                  title="Email:"
                  value={userInfo.email || ''}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
               />
            </div>
         </EditWidthImage>
      </Modal>
   )
}

export default Profile
