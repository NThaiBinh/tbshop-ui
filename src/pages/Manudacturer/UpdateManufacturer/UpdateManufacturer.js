import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import EditManufacturer from '../../components/EditManufacturer/EditManufacturer'
import { getManufacturerById, updateManufacturer } from '../../../services/manufacturerServices'
import { setShowToast } from '../../../store/actions'
import { imageApi } from '../../../services'

function UpdateManufacturer() {
   const [name, setName] = useState('')
   const [address, setAddress] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [email, setEmail] = useState('')
   const [image, setImage] = useState('')
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)

   const params = useParams()

   async function getManufacturerHandle(manufacId) {
      if (manufacId) {
         const manufacturerInfo = await getManufacturerById(manufacId)
         if (manufacturerInfo.code === 'SS') {
            setName(manufacturerInfo.data.name)
            setImage(manufacturerInfo.data.image)
            setPhoneNumber(manufacturerInfo.data.phoneNumber)
            setEmail(manufacturerInfo.data.email)
            setAddress(manufacturerInfo.data.address)
         }
      }
   }

   useEffect(() => {
      getManufacturerHandle(params.manufacId)
   }, [params.manufacId])

   async function handleSubmit() {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('address', address)
      formData.append('phoneNumber', phoneNumber)
      formData.append('email', email)
      formData.append('image', image)

      const message = await updateManufacturer({ manufacId: params.manufacId, formData })
      if (message === 'SS') {
         navigate(-1)
         dispatch(setShowToast(true, 'success', 'Sửa nhà sản xuất thành công'))
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa nhà sản xuất thất bại'))
      }
   }

   function handleDropFile(id, file) {
      setImage(file)
   }

   function handleImageChange(id, file) {
      setImage(file)
   }

   return (
      <EditManufacturer
         title="SỬA NHÀ SẢN XUẤT"
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

export default UpdateManufacturer
