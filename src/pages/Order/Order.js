import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import cssOrder from './Order.module.css'
import currencyFormat from '../../utils/currencyFormat'
import ButtonMedium from '../components/ButtonMedium/ButtonMedium'
import { getCartItems } from '../../services/cartServices'
import StoreContext from '../../store/StoreContext'
import { setShowToast } from '../../store/actions'
import { imageApi } from '../../services'
import { cancelOrder } from '../../services/orderServices'
import { confirmInvoice, getAllInvoicesByCustomerId } from '../../services/invoiceServices'

function Order() {
   const [state, dispatch] = useContext(StoreContext)
   const [cartInfo, setCartInfo] = useState({})
   const [userInfo, setUserInfo] = useState({})
   const [cartItems, setCartItems] = useState([])
   const [showForm, setShowForm] = useState('pending')
   const [activeMenu, setActiveMenu] = useState('pending')
   const [invoices, setInvoices] = useState([])

   useEffect(() => {
      const storedCartInfo = localStorage.getItem('cartInfo')
      if (storedCartInfo) {
         setCartInfo(JSON.parse(storedCartInfo))
      }
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])

   useEffect(() => {
      async function handleGetCartItems(cartId) {
         const cartItemInfo = await getCartItems(cartId)
         if (cartItemInfo.code === 'SS') {
            setCartItems(cartItemInfo.data)
         }
      }

      async function handleGetInvoides(customerId) {
         const invoiceInfo = await getAllInvoicesByCustomerId(customerId)
         if (invoiceInfo.code === 'SS') {
            setInvoices(invoiceInfo.data)
         }
      }

      if (cartInfo?.cartId) {
         handleGetCartItems(cartInfo.cartId)
      }

      if (userInfo?.userId) {
         handleGetInvoides(userInfo.userId)
      }
   }, [cartInfo, userInfo, state.isShowToast])

   async function handleCancelOrder(index) {
      const result = await cancelOrder(cartItems[index])
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Hủy đơn hàng thành công!'))
      } else {
         dispatch(setShowToast(false, 'error ', 'Hủy đơn hàng thất bại!'))
      }
   }

   async function handleReceived(index) {
      const result = await confirmInvoice(invoices[index].invoiceId)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Cảm ơn bạn đã mua hàng!'))
      }
   }

   return (
      <div className={cssOrder.wrapper}>
         <div className={cssOrder.groupSwitchForm}>
            <button
               className={clsx(cssOrder.btnSwitchForm, { [cssOrder.activeMenu]: activeMenu === 'pending' })}
               onClick={() => {
                  setShowForm('pending')
                  setActiveMenu('pending')
               }}
            >
               <i className={clsx('fa-solid fa-wallet', cssOrder.btnIcon)}></i>Chờ xác nhận
            </button>
            <button
               className={clsx(cssOrder.btnSwitchForm, { [cssOrder.activeMenu]: activeMenu === 'delivering' })}
               onClick={() => {
                  setShowForm('delivering')
                  setActiveMenu('delivering')
               }}
            >
               <i className={clsx('fa-solid fa-truck-fast', cssOrder.btnIcon)}></i>Chờ giao hàng
            </button>
            <button
               className={clsx(cssOrder.btnSwitchForm, { [cssOrder.activeMenu]: activeMenu === 'delivered' })}
               onClick={() => {
                  setShowForm('delivered')
                  setActiveMenu('delivered')
               }}
            >
               <i className={clsx('fa-solid fa-circle-info', cssOrder.btnIcon)}></i>Đơn hàng đã giao
            </button>
         </div>
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
               <strong>Thành tiền</strong>
            </div>
            {(showForm === 'pending' || showForm === 'delivering') && (
               <div className={cssOrder.wrapperItem}>
                  <strong>Hành động</strong>
               </div>
            )}
         </div>
         <div className={cssOrder.orderWrapper}>
            {showForm === 'pending' &&
               cartItems.map((cartItem, index) => {
                  if (cartItem.status === 'pending') {
                     return (
                        <div key={index} className={clsx(cssOrder.cartItem)}>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.wrapperItemMain, cssOrder.groupProduct)}>
                              <img
                                 className={cssOrder.productImage}
                                 src={`${imageApi}/${cartItem.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={cssOrder.productName}>
                                 <Link
                                    to={`/product/detail?productId=${cartItem.productId}&productConfigurationId=${cartItem.productConfigurationId}`}
                                 >
                                    {cartItem.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={cssOrder.productType}
                              >{`${cartItem.storageCapacity} ${cartItem.cpu} ${cartItem.gpu}`}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <strong>{cartItem.color}</strong>
                           </div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(cartItem.price)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>{cartItem.quantity}</div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(cartItem.totalPrice)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <ButtonMedium
                                 title="Hủy đơn"
                                 type="delete"
                                 handleClick={() => handleCancelOrder(index)}
                              />
                           </div>
                        </div>
                     )
                  }
               })}
            {showForm === 'delivering' &&
               invoices.map((invoice, index) => {
                  if (invoice.status === 'delivering') {
                     return (
                        <div key={index} className={clsx(cssOrder.cartItem)}>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.wrapperItemMain, cssOrder.groupProduct)}>
                              <img
                                 className={cssOrder.productImage}
                                 src={`${imageApi}/${invoice.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={cssOrder.productName}>
                                 <Link
                                    to={`/product/detail?productId=${invoice.productId}&productConfigurationId=${invoice.productConfigurationId}`}
                                 >
                                    {invoice.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={cssOrder.productType}
                              >{`${invoice.storageCapacity} ${invoice.cpu} ${invoice.gpu}`}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <strong>{invoice.color}</strong>
                           </div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(invoice.price)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>{invoice.quantity}</div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(invoice.totalPrice)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <ButtonMedium title="Đã nhận" type="delete" handleClick={() => handleReceived(index)} />
                           </div>
                        </div>
                     )
                  }
               })}
            {showForm === 'delivered' &&
               invoices.map((invoice, index) => {
                  if (invoice.status === 'delivered') {
                     return (
                        <div key={index} className={clsx(cssOrder.cartItem)}>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.wrapperItemMain, cssOrder.groupProduct)}>
                              <img
                                 className={cssOrder.productImage}
                                 src={`${imageApi}/${invoice.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={cssOrder.productName}>
                                 <Link
                                    to={`/product/detail?productId=${invoice.productId}&productConfigurationId=${invoice.productConfigurationId}`}
                                 >
                                    {invoice.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={cssOrder.productType}
                              >{`${invoice.storageCapacity} ${invoice.cpu} ${invoice.gpu}`}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>
                              <strong>{invoice.color}</strong>
                           </div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(invoice.price)}</strong>
                           </div>
                           <div className={cssOrder.wrapperItem}>{invoice.quantity}</div>
                           <div className={clsx(cssOrder.wrapperItem, cssOrder.productPrice)}>
                              <strong>{currencyFormat(invoice.totalPrice)}</strong>
                           </div>
                        </div>
                     )
                  }
               })}
         </div>
      </div>
   )
}

export default Order
