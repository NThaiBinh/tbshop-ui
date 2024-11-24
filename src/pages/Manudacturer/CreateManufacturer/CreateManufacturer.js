import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import EditManufacturer from '../../components/EditManufacturer/EditManufacturer'
import cssCreateManufacturer from './CreateManufacturer.module.css'
import { createManufacturer } from '../../../services/manufacturerServices'
import { setShowToast } from '../../../store/actions'

function CreateManufacturer() {
   const [name, setName] = useState('')
   const [address, setAddress] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [email, setEmail] = useState('')
   const [image, setImage] = useState()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)

   function handleDropFile(id, file) {
      setImage(file)
   }

   function handleImageChange(id, file) {
      setImage(file)
   }
   async function handleSubmit() {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('address', address)
      formData.append('phoneNumber', phoneNumber)
      formData.append('email', email)
      formData.append('image', image)
      const message = await createManufacturer(formData)
      if (message === 'SS') {
         dispatch(setShowToast(true, 'success', 'Thêm nhà sản xuất thành công'))
         navigate(-1)
      } else {
         dispatch(setShowToast(true, 'error', 'Thêm nhà sản xuất thất bại'))
      }
   }

   return (
      <EditManufacturer
         title="THÊM NHÀ SẢN XUẤT"
         image={image}
         name={name}
         setName={setName}
         address={address}
         setAddress={setAddress}
         phoneNumber={phoneNumber}
         setPhoneNumber={setPhoneNumber}
         email={email}
         setEmail={setEmail}
         handleDropFile={handleDropFile}
         handleImageChange={handleImageChange}
         handleSubmit={handleSubmit}
      />
   )
}

export default CreateManufacturer
