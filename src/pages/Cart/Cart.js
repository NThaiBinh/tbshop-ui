import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import cssCart from './Cart.module.css'
import Quantity from '../components/Quantity/Quantity'
import StoreContext from '../../store/StoreContext'
import currencyFormat from '../../utils/currencyFormat'
import { imageApi } from '../../services'
import ButtonMedium from '../components/ButtonMedium/ButtonMedium'
import { deleteCartItem, getCartItems, updateCartItem } from '../../services/cartServices'
import Loading from '../components/Loading/Loading'
import { setShowToast } from '../../store/actions'

function Cart() {
   const [cartInfo, setCartInfo] = useState()
   const [cartItems, setCartItems] = useState([])
   const [state, dispatch] = useContext(StoreContext)
   const [cartIndexChange, setCartIndexChange] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const [timerId, setTimerId] = useState()
   const [isSelectAll, setIsSelectAll] = useState(false)

   useEffect(() => {
      const storedCartInfo = localStorage.getItem('cartInfo')
      if (storedCartInfo) {
         setCartInfo(JSON.parse(storedCartInfo))
      }
   }, [])

   useEffect(() => {
      async function handleGetCartItems(cartId) {
         const cartItemInfo = await getCartItems(cartId)
         if (cartItemInfo.code === 'SS') {
            setCartItems(cartItemInfo.data)
         }
      }

      if (cartInfo?.cartId) {
         handleGetCartItems(cartInfo.cartId)
      }
   }, [cartInfo])

   useEffect(() => {
      setIsLoading(true)
      async function handleUpdateCartItem(index) {
         const result = await updateCartItem(cartItems[index])
      }

      if (cartIndexChange != undefined) {
         handleUpdateCartItem(cartIndexChange)
         setCartIndexChange(undefined)
      }

      setIsLoading(false)
   }, [cartIndexChange])

   function handleUpdateTimeOut(index) {
      if (timerId) clearTimeout(timerId)

      const newTimerId = setTimeout(() => {
         setCartIndexChange(index)
      }, 1000)
      setTimerId(newTimerId)
   }

   async function handleIncrease(maxValue, index) {
      setCartItems(
         cartItems.map((cartItem, i) => {
            if (i === index) {
               const value = cartItem.quantity + 1
               const newQuantity = value > maxValue ? cartItem.quantity : value
               return { ...cartItem, quantity: newQuantity, totalPrice: cartItem.price * newQuantity }
            }
            return cartItem
         }),
      )
      handleUpdateTimeOut(index)
   }

   function handleDecrease(minValue, index) {
      setCartItems(
         cartItems.map((cartItem, i) => {
            if (i === index) {
               const value = cartItem.quantity - 1
               const newQuantity = value < minValue ? cartItem.quantity : value
               return {
                  ...cartItem,
                  quantity: newQuantity,
                  totalPrice: cartItem.price * newQuantity,
               }
            }
            return cartItem
         }),
      )
      handleUpdateTimeOut(index)
   }

   function handleQuantityChange(minValue, maxValue, newValue, index) {
      setCartItems(
         cartItems.map((cartItem, i) => {
            if (i === index) {
               const value = parseInt(newValue === '' ? 0 : newValue)
               const newQuantity = value < minValue || newValue > maxValue ? cartItem.quantity : value
               return {
                  ...cartItem,
                  quantity: newQuantity,
                  totalPrice: cartItem.price * newQuantity,
               }
            }
            return cartItem
         }),
      )
      handleUpdateTimeOut(index)
   }

   function handleSelectAll(e) {
      const newState = !isSelectAll
      setIsSelectAll(newState)
      setCartItems(
         cartItems.map((cartItem) => {
            return { ...cartItem, isChecked: newState }
         }),
      )
   }

   function handleSelectItem(index) {
      const updateCartItems = cartItems.map((cartItem, i) =>
         i === index ? { ...cartItem, isChecked: cartItem.isChecked ? !cartItem.isChecked : true } : cartItem,
      )
      setCartItems(updateCartItems)
      setIsSelectAll(updateCartItems.every((cartItem) => cartItem.isChecked))
   }

   async function handleDeleteCartItem(index) {
      const result = await deleteCartItem(cartItems[index])
      if (result.code === 'SS') {
         setCartItems(
            cartItems.filter((cartItem, i) => {
               if (index !== i) return cartItem
            }),
         )
         dispatch(setShowToast(true, 'success', 'Xóa sản phẩm thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Xóa sản phẩm thất bại!'))
      }
   }
   return (
      <div className={cssCart.wrapper}>
         <Loading isVisible={isLoading} />
         <div className={clsx(cssCart.wrapperGroup, cssCart.cartHeader)}>
            <div className={cssCart.groupCheckbox}>
               <input type="checkbox" checked={isSelectAll} onChange={handleSelectAll} />
            </div>
            <div className={clsx(cssCart.wrapperItem, cssCart.wrapperItemMain)}>
               <strong>Sản phẩm</strong>
            </div>
            <div className={cssCart.wrapperItem}>
               <strong>Màu sắc</strong>
            </div>
            <div className={cssCart.wrapperItem}>
               <strong>Đơn giá</strong>
            </div>
            <div className={cssCart.wrapperItem}>
               <strong>Số lượng</strong>
            </div>
            <div className={cssCart.wrapperItem}>
               <strong>Thành tiền</strong>
            </div>
            <div className={cssCart.wrapperItem}>
               <strong>Hành động</strong>
            </div>
         </div>
         <div className={clsx(cssCart.wrapperGroup, cssCart.cartContainer)}>
            {cartItems.map((cartItem, index) => (
               <div key={cartItem.productConfigurationId} className={cssCart.cartItem}>
                  <div className={cssCart.groupCheckbox}>
                     <input
                        type="checkbox"
                        checked={cartItem.isChecked || false}
                        onChange={() => handleSelectItem(index)}
                     />
                  </div>
                  <div className={clsx(cssCart.wrapperItem, cssCart.wrapperItemMain, cssCart.groupProduct)}>
                     <img className={cssCart.productImage} src={`${imageApi}/${cartItem.image}`} alt="Ảnh sản phẩm" />
                     <h3 className={cssCart.productName}>{cartItem.name}</h3>
                     <strong
                        className={cssCart.productType}
                     >{`${cartItem.storageCapacity} ${cartItem.cpu} ${cartItem.gpu}`}</strong>
                  </div>
                  <div className={cssCart.wrapperItem}>
                     <strong>{cartItem.color}</strong>
                  </div>
                  <div className={clsx(cssCart.wrapperItem, cssCart.productPrice)}>
                     <strong>{currencyFormat(cartItem.price)}</strong>
                  </div>
                  <div className={cssCart.wrapperItem}>
                     <Quantity
                        quantity={cartItem.quantity}
                        onIncrease={() => handleIncrease(cartItem.stockQuantity, index)}
                        onDecrease={() => handleDecrease(1, index)}
                        onChange={(e) => handleQuantityChange(0, cartItem.stockQuantity, e.target.value, index)}
                     />
                  </div>
                  <div className={clsx(cssCart.wrapperItem, cssCart.productPrice)}>
                     <strong>{currencyFormat(cartItem.totalPrice)}</strong>
                  </div>
                  <div className={cssCart.wrapperItem}>
                     <ButtonMedium title="Xóa" type="delete" handleClick={() => handleDeleteCartItem(index)} />
                  </div>
               </div>
            ))}
         </div>
         <div className={cssCart.cartFooter}>
            <div>Tổng số sản phẩm</div>
            <div>Tổng tiền</div>
            <div className={cssCart.action}>
               <ButtonMedium title="Mua ngay" />
            </div>
         </div>
      </div>
   )
}

export default Cart
