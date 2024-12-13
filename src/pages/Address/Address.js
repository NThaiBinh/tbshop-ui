import { useContext, useEffect, useState } from 'react'
import Modal from '../../components/Layouts/components/Modal/Modal'
import EditWithoutImage from '../components/EditWithoutImage/EditWithoutImage'
import InputValue from '../components/InputValue/InputValue'
import styles from './Address.module.css'
import { useNavigate } from 'react-router-dom'
import {
   createCustomerAddress,
   deleteCustomerAddress,
   getAllCustomerAddress,
   updateDefaultCustomerAddress,
} from '../../services/customerServices'
import StoreContext from '../../store/StoreContext'
import { setIsUpdate, setShowToast } from '../../store/actions'
import ButtonMedium from '../components/ButtonMedium/ButtonMedium'

function Address() {
   const [userInfo, setUserInfo] = useState({})
   const [customerAddresses, setCustomerAddresses] = useState([])
   const [address, setAddress] = useState('')
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])

   useEffect(() => {
      async function handleGetAllCustomerAddress(customerId) {
         const customerAddressInfo = await getAllCustomerAddress(customerId)
         if (customerAddressInfo.code === 'SS') {
            setCustomerAddresses(customerAddressInfo.data)
         }
      }
      if (userInfo.userId) {
         handleGetAllCustomerAddress(userInfo.userId)
      }
   }, [userInfo.userId, state.isUpdate])

   async function handleSubmit() {
      const result = await createCustomerAddress(userInfo.userId, address)
      if (result.code === 'SS') {
         setAddress('')
         dispatch(setIsUpdate(!state.isUpdate))
         dispatch(setShowToast(true, 'success', 'Thêm địa chỉ thành công!'))
      }
   }

   async function handleUpdateDefault(index) {
      const result = await updateDefaultCustomerAddress(customerAddresses[index].addressId)
      if (result.code === 'SS') {
         dispatch(setIsUpdate(!state.isUpdate))
         dispatch(setShowToast(true, 'success', 'Cập nhật địa chỉ thành công!'))
      }
   }

   async function handleDelete(index) {
      if (customerAddresses[index].isDefault === true) {
         dispatch(setShowToast(true, 'success', 'Không thể xóa địa chỉ mặc định'))
      } else {
         const result = await deleteCustomerAddress(customerAddresses[index].addressId)
         if (result.code === 'SS') {
            dispatch(setIsUpdate(!state.isUpdate))
            dispatch(setShowToast(true, 'success', 'Xóa địa chỉ thành công!'))
         }
      }
   }
   function handleExit() {
      navigate(-1)
   }
   return (
      <Modal>
         <EditWithoutImage title="Thông tin địa chỉ" handleSubmit={handleSubmit} handleExit={handleExit}>
            <div className={styles.wrapper}>
               <div className={styles.groupAddress}>
                  {customerAddresses.map((customerAddress, index) => (
                     <div key={customerAddress.addressId} className={styles.address}>
                        <div className={styles.addressInfo}>
                           <h4>
                              Địa chỉ {index + 1}
                              {customerAddress.isDefault && ' (Mặc định)'}:
                           </h4>
                           <p>{customerAddress.address}</p>
                        </div>
                        <div className={styles.action}>
                           <ButtonMedium
                              title="Mặc định"
                              type="submit"
                              handleClick={() => handleUpdateDefault(index)}
                           />
                           <ButtonMedium title="Xóa" type="delete" handleClick={() => handleDelete(index)} />
                        </div>
                     </div>
                  ))}
               </div>
               <div className={styles.addNewAddress}>
                  <InputValue
                     id="addNewAddress"
                     title="Thêm địa chỉ mới:"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </div>
            </div>
         </EditWithoutImage>
      </Modal>
   )
}

export default Address
