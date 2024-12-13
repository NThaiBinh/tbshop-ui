import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import EditWidthImage from '../EditWidthImage/EditWidthImage'
import InputValue from '../InputValue/InputValue'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import styles from './EditManufacturer.module.css'
function EditManufacturer({
   title,
   image,
   handleDropFile,
   handleImageChange,
   name,
   setName,
   address,
   setAddress,
   phoneNumber,
   setPhoneNumber,
   email,
   setEmail,
   handleSubmit,
}) {
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   function handleExit() {
      navigate(-1)
   }
   return (
      <Modal>
         <EditWidthImage
            title={title}
            image={image}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
         >
            <div className={styles.wrapper}>
               <InputValue
                  title="Tên nhà sản xuất:"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequire={true}
               />
               <InputValue
                  title="Địa chỉ:"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  isRequire={true}
               />
               <InputValue
                  title="Số điện thoại:"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  isRequire={true}
               />
               <InputValue
                  title="Email:"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequire={true}
               />
            </div>
         </EditWidthImage>
      </Modal>
   )
}

export default EditManufacturer
