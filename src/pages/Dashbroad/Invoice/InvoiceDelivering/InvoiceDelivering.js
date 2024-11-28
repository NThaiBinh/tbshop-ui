import { useContext, useEffect, useState } from 'react'
import cssInvoiceDelivering from './InvoiceDelivering.module.css'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import ButtonMedium from '../../../components/ButtonMedium/ButtonMedium'
import { imageApi } from '../../../../services'
import currencyFormat from '../../../../utils/currencyFormat'
import { createInvoice } from '../../../../services/invoiceServices'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import { getAllInvoices } from '../../../../services/invoiceServices'

function InvoiceDelivering() {
   const [state, dispatch] = useContext(StoreContext)
   const [invoices, setInvoices] = useState([])
   const [userInfo, setUserInfo] = useState()

   useEffect(() => {
      async function handleGetAllOrders() {
         const invoiceInfo = await getAllInvoices()
         if (invoiceInfo?.code === 'SS') {
            setInvoices(invoiceInfo.data)
         }
      }
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
      handleGetAllOrders()
   }, [state.isShowToast])

   return (
      <div className={cssInvoiceDelivering.wrapper}>
         <div className={cssInvoiceDelivering.titleForm}>
            <div className={clsx(cssInvoiceDelivering.wrapperItem, cssInvoiceDelivering.wrapperItemMain)}>
               <strong>Sản phẩm</strong>
            </div>
            <div className={cssInvoiceDelivering.wrapperItem}>
               <strong>Màu sắc</strong>
            </div>
            <div className={cssInvoiceDelivering.wrapperItem}>
               <strong>Đơn giá</strong>
            </div>
            <div className={cssInvoiceDelivering.wrapperItem}>
               <strong>Số lượng</strong>
            </div>
            <div className={cssInvoiceDelivering.wrapperItem}>
               <strong>Số lượng tồn</strong>
            </div>
            <div className={cssInvoiceDelivering.wrapperItem}>
               <strong>Thành tiền</strong>
            </div>
         </div>
         {invoices.map((order, index) => {
            let totalOrderProduct = 0
            let totalOrderPrice = 0
            return (
               <div key={index} className={cssInvoiceDelivering.orderWrapper}>
                  <div className={cssInvoiceDelivering.customerInfo}>
                     <strong className={cssInvoiceDelivering.customerId}>{order.customerId}</strong>
                     <strong className={cssInvoiceDelivering.name}>{order.name}</strong>
                     <strong className={cssInvoiceDelivering.address}>{order.address}</strong>
                  </div>
                  {order.invoiceList.map((orderItem, index) => {
                     totalOrderPrice += orderItem.totalPrice
                     totalOrderProduct += orderItem.quantity
                     return (
                        <div key={index} className={cssInvoiceDelivering.orderItem}>
                           <div
                              className={clsx(
                                 cssInvoiceDelivering.wrapperItem,
                                 cssInvoiceDelivering.wrapperItemMain,
                                 cssInvoiceDelivering.groupProduct,
                              )}
                           >
                              <img
                                 className={cssInvoiceDelivering.productImage}
                                 src={`${imageApi}/${orderItem.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={cssInvoiceDelivering.productName}>
                                 <Link
                                    to={`/product/detail?productId=${orderItem.productId}&productConfigurationId=${orderItem.productConfigurationId}`}
                                 >
                                    {orderItem.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={cssInvoiceDelivering.productType}
                              >{`${orderItem.storageCapacity} ${orderItem.cpu} ${orderItem.gpu}`}</strong>
                           </div>
                           <div className={cssInvoiceDelivering.wrapperItem}>
                              <strong>{orderItem.color}</strong>
                           </div>
                           <div className={clsx(cssInvoiceDelivering.wrapperItem, cssInvoiceDelivering.productPrice)}>
                              <strong>{currencyFormat(orderItem.price)}</strong>
                           </div>
                           <div className={cssInvoiceDelivering.wrapperItem}>{orderItem.quantity}</div>
                           <div className={cssInvoiceDelivering.wrapperItem}>{orderItem.stockQuantity}</div>
                           <div className={clsx(cssInvoiceDelivering.wrapperItem, cssInvoiceDelivering.productPrice)}>
                              <strong>{currencyFormat(orderItem.totalPrice)}</strong>
                           </div>
                        </div>
                     )
                  })}
                  <div className={cssInvoiceDelivering.footer}>
                     <strong>
                        Tổng số đơn hàng:{false && (order.totalOrderProduct = totalOrderProduct)} {totalOrderProduct}
                     </strong>
                     <strong>
                        Tổng giá trị đơn hàng:{false && (order.totalOrderPrice = totalOrderPrice)}{' '}
                        {currencyFormat(totalOrderPrice)}
                     </strong>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default InvoiceDelivering
