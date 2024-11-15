import EditWidthImage from '../EditWidthImage/EditWidthImage'
import InputValue from '../InputValue/InputValue'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import cssEditManudacturer from './EditManufacturer.module.css'
function EditManufacturer({
   title,
   image,
   imageChange,
   name,
   setName,
   address,
   setAddress,
   phoneNumber,
   setPhoneNumber,
   email,
   setEmail,
   handleSubmit,
   handleExit,
}) {
   return (
      <Modal>
         <EditWidthImage
            title={title}
            image={image}
            imageChange={imageChange}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
         >
            <div className={cssEditManudacturer.wrapper}>
               <InputValue title="Tên nhà sản xuất" id="name" value={name} onChange={(e) => setName(e.target.value)} />
               <InputValue title="Địa chỉ" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
               <InputValue
                  title="Số điện thoại"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
               />
               <InputValue title="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
         </EditWidthImage>
      </Modal>
   )
}

export default EditManufacturer
