import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setShowToast } from '../../../store/actions'
import StoreContext from '../../../store/StoreContext'
import EditProductDiscount from '../../components/EditProductDiscount/EditProductDiscount'
import { createProductDiscount } from '../../../services/productDiscountServices'

function CreateProductDiscount() {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()
   const [productId, setProductId] = useState('')
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')
   const [posterDiscount, setPosterDiscount] = useState()

   async function handleSubmit() {
      const formData = new FormData()
      formData.append('posterDiscount', posterDiscount)
      formData.append('productId', productId)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('startDate', startDate)
      formData.append('endDate', endDate)
      const result = await createProductDiscount(formData)
      if (result === 'SS') {
         navigate(state.previousPath)
         dispatch(setShowToast(true, 'success', 'Thêm khuyến mãi thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Thêm khuyến mãi thất bại!'))
      }
   }
   return (
      <EditProductDiscount
         title="THÔNG TIN KHUYẾN MÃI SẢN PHẨM"
         productId={productId}
         setProductId={setProductId}
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

export default CreateProductDiscount
