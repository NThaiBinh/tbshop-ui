import { useContext, useEffect, useState } from 'react'
import { getAllOrders } from '../../../../services/orderServices'
import { createInvoice } from '../../../../services/invoiceServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import OrderList from '../../../components/OrderList/OrderList'

function OrderPending() {
   const [state, dispatch] = useContext(StoreContext)
   const [ordersPending, setOrdersPending] = useState([])
   const [userInfo, setUserInfo] = useState()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])

   useEffect(() => {
      async function handleGetAllOrders() {
         const ordersInfo = await getAllOrders()
         if (ordersInfo?.code === 'SS') {
            setOrdersPending(ordersInfo.data)
         }
      }

      handleGetAllOrders()
   }, [state.isShowToast])

   async function handleConfirm(index) {
      ordersPending[index].employeeId = userInfo.userId
      ordersPending[index].purchasedInStore = 'False'
      ordersPending[index].status = 'delivering'
      const result = await createInvoice(ordersPending[index])
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xác nhận hóa đơn thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Xác nhận đơn hàng thất bại!'))
      }
   }

   return <OrderList orders={ordersPending} handleConfirm={handleConfirm} titleBtnAction="Xác nhận" />
}

export default OrderPending
