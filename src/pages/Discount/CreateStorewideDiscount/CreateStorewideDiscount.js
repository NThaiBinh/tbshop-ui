import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setShowToast } from '../../../store/actions'
import EditStorewideDiscount from '../../components/EditStorewideDiscount/EditStorewideDiscount'
import { createStorewideDiscount } from '../../../services/storewideDiscountServices'
import StoreContext from '../../../store/StoreContext'

function CreateStorewideDiscount() {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')
   const [posterDiscount, setPosterDiscount] = useState()

   async function handleSubmit() {
      const formData = new FormData()
      formData.append('posterDiscount', posterDiscount)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('startDate', startDate)
      formData.append('endDate', endDate)
      const result = await createStorewideDiscount(formData)
      if (result === 'SS') {
         navigate(state.previousPath)
         dispatch(setShowToast(true, 'success', 'Thêm khuyến mãi thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Thêm khuyến mãi thất bại!'))
      }
   }

   return (
      <EditStorewideDiscount
         title="THÔNG TIN KHUYẾN MÃI CHUNG"
         name={name}
         setName={setName}
         price={price}
         setPrice={setPrice}
         startDate={startDate}
         setStartDate={setStartDate}
         endDate={endDate}
         setEndDate={setEndDate}
         posterDiscount={posterDiscount}
         setPosterDiscount={setPosterDiscount}
         handleSubmit={handleSubmit}
      />
   )
}

export default CreateStorewideDiscount
