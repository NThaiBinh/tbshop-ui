import { useEffect, useState } from 'react'
import OrderList from '../../../components/OrderList/OrderList'
import { getAllInvoices } from '../../../../services/invoiceServices'
import { useNavigate } from 'react-router-dom'

function OrderDelivered() {
   const [orderDelivereds, setOrderDelivereds] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      async function handleGetAllOrders() {
         const invoiceInfo = await getAllInvoices('delivered')
         if (invoiceInfo?.code === 'SS') {
            setOrderDelivereds(invoiceInfo.data)
         }
      }

      handleGetAllOrders()
   }, [])

   function handleConfirm(index) {
      navigate(`/dashbroad/orders-delivering/print/${orderDelivereds[index].invoiceId}`)
   }
   return <OrderList orders={orderDelivereds} titleBtnAction="In hóa đơn" handleConfirm={handleConfirm} />
}

export default OrderDelivered
