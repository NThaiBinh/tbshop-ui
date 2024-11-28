import { Fragment, useContext, useEffect, useState } from 'react'
import cssOrder from './Order.module.css'
import { getAllOrders } from '../../../services/orderServices'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import ButtonMedium from '../../components/ButtonMedium/ButtonMedium'
import { imageApi } from '../../../services'
import currencyFormat from '../../../utils/currencyFormat'
import { createInvoice } from '../../../services/invoiceServices'
import StoreContext from '../../../store/StoreContext'
import { setShowToast } from '../../../store/actions'

function Order() {
   const [state, dispatch] = useContext(StoreContext)
   const [orders, setOrders] = useState([])
   const [userInfo, setUserInfo] = useState()

   useEffect(() => {
      async function handleGetAllOrders() {
         const ordersInfo = await getAllOrders()
         if (ordersInfo?.code === 'SS') {
            setOrders(ordersInfo.data)
         }
      }
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
      handleGetAllOrders()
   }, [state.isShowToast])

   async function handleConfirm(index) {
      orders[index].employeeId = userInfo.userId
      orders[index].purchasedInStore = 'False'
      orders[index].status = 'delivering'
      const result = await createInvoice(orders[index])
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xác nhận hóa đơn thành công!'))
      }
   }

   return (
      <div className={cssOrder.wrapper}>
         <div className={cssOrder.titleForm}>
            <div className={clsx(cssOrder.wrapperItem, cssOrder.wrapperItemMain)}>
               <strong>Sản phẩm</strong>
            </div>
            <div className={cssOrder.wrapperItem}>
               <strong>Màu sắc</strong>
            </div>
            <div className={cssOrder.wrapperItem}>
               <strong>Đơn giá</strong>
            </div>
            <div className={cssOrder.wrapperItem}>
               <strong>Số lượng</strong>
            </div>
            <div className={cssOrder.wrapperItem}>
               <strong>Số lượng tồn</strong>
            </div>
            <div className={cssOrder.wrapperItem}>
               <strong>Thành tiền</strong>
            </div>
         </div>
         {orders.map((order, index) => {
            let totalOrderProduct = 0
            let totalOrderPrice = 0
            return (
               <div key={index} className={cssOrder.orderWrapper}>
                  <div className={cssOrder.customerInfo}>
                     <strong className={cssOrder.customerId}>{order.customerId}</strong>
                     <strong className={cssOrder.name}>{order.name}</strong>
                     <strong className={cssOrder.address}>{order.address}</strong>
                     <div className={cssOrder.wrapBtnConfirm}>
                        <ButtonMedium title="Xác nhận" type="delete" handleClick={() => handleConfirm(index)} />
                     </div>
                  </div>
                  {order.orderList.map((orderItem, index) => {
                     totalOrderPrice += orderItem.totalPrice
                     totalOrderProduct += orderItem.quantity
                     order.totalOrderProduct = totalOrderProduct
                     order.totalOrderPrice = totalOrderPrice
                     return (
                        <div key={index} className={cssOrder.orderItem}>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.wrapperItemMain, cssOrder.groupProduct)}>
                              <img
                                 className={cssOrder.productImage}
                                 src={`${imageApi}/${orderItem.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={cssOrder.productName}>
                                 <Link
                                    to={`/product/detail?productId=${orderItem.productId}&productConfigurationId=${orderItem.productConfigurationId}`}
                                 >
                                    {orderItem.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={cssOrder.productType}
                              >{`${orderItem.storageCapacity} ${orderItem.cpu} ${orderItem.gpu}`}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <strong>{orderItem.color}</strong>
                           </div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(orderItem.price)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>{orderItem.quantity}</div>
                           <div className={cssOrder.wrapperItem}>{orderItem.stockQuantity}</div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(orderItem.totalPrice)}</strong>
                           </div>
                        </div>
                     )
                  })}
                  <div className={cssOrder.footer}>
                     <strong>Tổng số đơn hàng: {`   ` + totalOrderProduct}</strong>
                     <strong>Tổng giá trị đơn hàng: {`   ` + currencyFormat(totalOrderPrice)}</strong>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default Order
