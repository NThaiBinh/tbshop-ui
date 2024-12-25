import { useNavigate } from 'react-router-dom'
import Modal from '../../../../components/Layouts/components/Modal/Modal'
import InputValue from '../../../components/InputValue/InputValue'
import styles from './UpdateStoreInfo.module.css'
import { useContext, useEffect, useState } from 'react'
import { getStoreInfo, updateStoreInfo } from '../../../../services/storeServices'
import StoreContext from '../../../../store/StoreContext'
import { setIsUpdate, setShowToast } from '../../../../store/actions'
import EditWidthImage from '../../../components/EditWidthImage/EditWidthImage'

function UpdateStoreInfo() {
   const [state, dispatch] = useContext(StoreContext)

   const [storeInfo, setStoreInfo] = useState({
      image: '',
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
   })
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetStoreInfo() {
         const result = await getStoreInfo()
         if (result.code === 'SS') {
            setStoreInfo(result.data)
         }
      }

      handleGetStoreInfo()
   }, [])

   async function handleSubmit() {
      const formData = new FormData()

      formData.append('image', storeInfo.image)
      formData.append('name', storeInfo.name)
      formData.append('address', storeInfo.address)
      formData.append('phoneNumber', storeInfo.phoneNumber)
      formData.append('email', storeInfo.email)

      const result = await updateStoreInfo(formData)
      if (result.code === 'SS') {
         navigate(-1)
         dispatch(setShowToast(true, 'success', 'Cập nhật thành công!'))
         dispatch(setIsUpdate(!state.isUpdate))
      } else {
         dispatch(setShowToast(true, 'error', 'Cập nhật thất bại!'))
      }
   }

   function handleDropFile(id, file) {
      setStoreInfo({ ...storeInfo, image: file })
   }

   function handleImageChange(id, file) {
      setStoreInfo({ ...storeInfo, image: file })
   }

   return (
      <Modal>
         <EditWidthImage
            title="THÔNG TIN CỬA HÀNG"
            handleExit={() => navigate(-1)}
            handleSubmit={handleSubmit}
            image={storeInfo?.image}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
         >
            <div className={styles.wrapper}>
               <div className={styles.groupInput}>
                  <InputValue
                     id="store-name"
                     title="Tên cửa hàng:"
                     value={storeInfo?.name}
                     onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.groupInput}>
                  <InputValue
                     id="store-name"
                     title="Địa chỉ cửa hàng:"
                     value={storeInfo?.address}
                     onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.groupInput}>
                  <InputValue
                     id="store-name"
                     title="Số điện thoại cửa hàng:"
                     value={storeInfo?.phoneNumber}
                     type="number"
                     onChange={(e) => setStoreInfo({ ...storeInfo, phoneNumber: e.target.value })}
                     isRequire={true}
                  />
               </div>
               <div className={styles.groupInput}>
                  <InputValue
                     id="store-name"
                     title="Email cửa hàng:"
                     value={storeInfo.email}
                     onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                     isRequire={true}
                  />
               </div>
            </div>
         </EditWidthImage>
      </Modal>
   )
}

export default UpdateStoreInfo
