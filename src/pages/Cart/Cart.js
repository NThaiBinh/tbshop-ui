import { Fragment, useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './Cart.module.css'
import Quantity from '../components/Quantity/Quantity'
import StoreContext from '../../store/StoreContext'
import currencyFormat from '../../utils/currencyFormat'
import { imageApi } from '../../services'
import ButtonMedium from '../components/ButtonMedium/ButtonMedium'
import { deleteCartItem, getCartItems, updateCartItem } from '../../services/cartServices'
import Loading from '../components/Loading/Loading'
import { setShowToast } from '../../store/actions'
import { Link } from 'react-router-dom'
import { createOrder } from '../../services/orderServices'
import ProductList from '../../pages/components/ProductsList/ProductsList'
import { getAllProductsInfo } from '../../services/productServices'
import BlankPage from '../../pages/BlankPage/BlankPage'

function Cart() {
   const [cartInfo, setCartInfo] = useState()
   const [cartItems, setCartItems] = useState([])
   const [state, dispatch] = useContext(StoreContext)
   const [cartIndexChange, setCartIndexChange] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const [timerId, setTimerId] = useState()
   const [isSelectAll, setIsSelectAll] = useState(false)
   const [products, setProducts] = useState([])
   let totalProduct = 0
   let totalProductPrice = 0

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
            setCartItems(cartItemInfo.data.filter((cartItem) => cartItem.status === 'in-cart'))
         }
      }

      if (cartInfo?.cartId) {
         handleGetCartItems(cartInfo.cartId)
      }
   }, [cartInfo, state.isShowToast])

   useEffect(() => {
      setIsLoading(true)
      async function handleUpdateCartItem(index) {
         const result = await updateCartItem(cartItems[index])
      }

      if (cartIndexChange !== undefined) {
         handleUpdateCartItem(cartIndexChange)
         setCartIndexChange(undefined)
      }

      setIsLoading(false)
   }, [cartIndexChange, cartItems])

   useEffect(() => {
      async function handleGetAllProductInfo() {
         const products = await getAllProductsInfo('1')
         if (products.code === 'SS') {
            setProducts(products.data)
         }
      }

      handleGetAllProductInfo()
   }, [])

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

   async function handleBuy() {
      const productSelectd = cartItems.filter((cartItem) => cartItem.isChecked === true)
      if (productSelectd.length <= 0) {
         dispatch(setShowToast(true, 'error', 'Bạn chưa chọn sản phẩm nào!'))
      } else {
         const result = await createOrder(productSelectd)
         if (result.code === 'SS') {
            dispatch(setShowToast(true, 'success', 'Đặt hàng thành công!'))
            setCartItems(cartItems.filter((cartItem) => cartItem.isChecked !== true))
         } else {
            dispatch(setShowToast(false, 'error ', 'Đặt hàng thất bại!'))
         }
      }
   }

   return (
      <div className={styles.wrapper}>
         <Loading isVisible={isLoading} />
         <div className={styles.cartInfo}>
            {cartItems.length > 0 ? (
               <Fragment>
                  <div className={clsx(styles.wrapperGroup, styles.cartHeader)}>
                     <div className={styles.groupCheckbox}>
                        <input type="checkbox" checked={isSelectAll} onChange={handleSelectAll} />
                     </div>
                     <div className={clsx(styles.wrapperItem, styles.wrapperItemMain)}>
                        <strong>Sản phẩm</strong>
                     </div>
                     <div className={styles.wrapperItem}>
                        <strong>Màu sắc</strong>
                     </div>
                     <div className={styles.wrapperItem}>
                        <strong>Đơn giá</strong>
                     </div>
                     <div className={styles.wrapperItem}>
                        <strong>Số lượng</strong>
                     </div>
                     <div className={styles.wrapperItem}>
                        <strong>Thành tiền</strong>
                     </div>
                     <div className={styles.wrapperItem}>
                        <strong>Hành động</strong>
                     </div>
                  </div>
                  <div className={clsx(styles.wrapperGroup, styles.cartContainer)}>
                     {cartItems.map((cartItem, index) => {
                        if (cartItem.status === 'in-cart') {
                           totalProduct += parseInt(cartItem.quantity)
                           totalProductPrice += parseFloat(cartItem.totalPrice)
                           return (
                              <div key={cartItem.productConfigurationId} className={styles.cartItem}>
                                 <div className={styles.groupCheckbox}>
                                    <input
                                       type="checkbox"
                                       checked={cartItem.isChecked || false}
                                       onChange={() => handleSelectItem(index)}
                                    />
                                 </div>
                                 <div className={clsx(styles.wrapperItem, styles.wrapperItemMain, styles.groupProduct)}>
                                    <img
                                       className={styles.productImage}
                                       src={`${imageApi}/${cartItem.image}`}
                                       alt="Ảnh sản phẩm"
                                    />
                                    <h3 className={styles.productName}>
                                       <Link
                                          className={styles.productLink}
                                          to={`/product/detail?productId=SP_25112024005010&productConfigurationId=CH_25112024005010`}
                                       >
                                          {cartItem.name}
                                       </Link>
                                    </h3>
                                    <strong
                                       className={styles.productType}
                                    >{`${cartItem.storageCapacity} ${cartItem.cpu} ${cartItem.gpu}`}</strong>
                                 </div>
                                 <div className={styles.wrapperItem}>
                                    <strong>{cartItem.color}</strong>
                                 </div>
                                 <div className={clsx(styles.wrapperItem, styles.productPrice)}>
                                    <strong>{currencyFormat(cartItem.price)}</strong>
                                 </div>
                                 <div className={styles.wrapperItem}>
                                    <Quantity
                                       quantity={cartItem.quantity}
                                       onIncrease={() => handleIncrease(cartItem.stockQuantity, index)}
                                       onDecrease={() => handleDecrease(1, index)}
                                       onChange={(e) =>
                                          handleQuantityChange(0, cartItem.stockQuantity, e.target.value, index)
                                       }
                                    />
                                 </div>
                                 <div className={clsx(styles.wrapperItem, styles.productPrice)}>
                                    <strong>{currencyFormat(cartItem.totalPrice)}</strong>
                                 </div>
                                 <div className={styles.wrapperItem}>
                                    <ButtonMedium
                                       title="Xóa"
                                       type="delete"
                                       handleClick={() => handleDeleteCartItem(index)}
                                    />
                                 </div>
                              </div>
                           )
                        }
                     })}
                  </div>
                  <div className={styles.cartFooter}>
                     <div className={styles.totalProduct}>
                        Tổng số sản phẩm: <strong>{totalProduct}</strong>
                     </div>
                     <div className={styles.totalPrice}>
                        Tổng tiền: <strong>{currencyFormat(totalProductPrice)}</strong>
                     </div>
                     <div className={styles.action}>
                        <ButtonMedium title="Mua ngay" type="submit" handleClick={handleBuy} />
                     </div>
                  </div>
               </Fragment>
            ) : (
               <div className={styles.groupBlankPage}>
                  <BlankPage />
               </div>
            )}
         </div>
         <ProductList title="Có thể bạn quan tâm" products={products} />
      </div>
   )
}

export default Cart
