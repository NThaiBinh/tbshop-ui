import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import EditManufacturer from '../../components/EditManufacturer/EditManufacturer'
import { getManufacturerById, updateManufacturer } from '../../../services/manufacturerServices'
import { setShowToast } from '../../../store/actions'

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
         const manufacturer = await getManufacturerById(manufacId)
         if (manufacturer) {
            setName(manufacturer.TENNSX)
            setAddress(manufacturer.DIACHINSX)
            setPhoneNumber(manufacturer.SDTNSX)
            setEmail(manufacturer.EMAILNSX)
            setImage(manufacturer.ANHNSX)
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
         navigate(state.previousPath)
         dispatch(setShowToast(true, 'success', 'Sửa nhà sản xuất thành công'))
      } else {
         dispatch(setShowToast(true, 'error', 'Sửa nhà sản xuất thất bại'))
      }
   }

   function handleExit() {
      navigate(state.previousPath)
   }

   return (
      <EditManufacturer
         title="SỬA NHÀ SẢN XUẤT"
         image={image}
         imageChange={(e) => setImage(e.target.files[0])}
         name={name}
         setName={setName}
         address={address}
         setAddress={setAddress}
         phoneNumber={phoneNumber}
         setPhoneNumber={setPhoneNumber}
         email={email}
         setEmail={setEmail}
         handleSubmit={handleSubmit}
         handleExit={handleExit}
      />
   )
}

export default UpdateManufacturer
