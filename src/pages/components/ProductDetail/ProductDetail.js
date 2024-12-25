import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Cookie from 'js-cookie'
import Slider from '../Slider/Slider'
import styles from './ProductDetail.module.css'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import curencyFormat from '../../../utils/currencyFormat'
import { getProductDetails } from '../../../services/productServices'
import { objProductConfiguration, objProductInfo } from '../../Dashbroad/Product/objectProduct'
import { dateFormat } from '../../../utils/formatDate'
import currencyFormat from '../../../utils/currencyFormat'
import StoreContext from '../../../store/StoreContext'
import { setShowToast } from '../../../store/actions'
import { addCartItem } from '../../../services/cartServices'
import Quantity from '../Quantity/Quantity'
import { createOrder } from '../../../services/orderServices'

function ProductDetail() {
   const location = useLocation()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const queryParams = new URLSearchParams(location.search)

   const [imagesDetail, setImagesDetail] = useState([])
   const [productDetails, setProductDetails] = useState({
      productInfo: objProductInfo,
      productConfiguration: objProductConfiguration,
   })
   const widthSlide = 680
   const maxWidthSlide = (imagesDetail.length - 1) * widthSlide * -1

   const [productColors, setProductColors] = useState([])
   const productId = queryParams.get('productId')
   const productConfigurationId = queryParams.get('productConfigurationId')
   const [productColorId, setProductColorId] = useState()
   const [quantity, setQuantity] = useState(1)

   useEffect(() => {
      async function handleGetProductDetails(productId, productConfigurationId) {
         const productDetailsInfo = await getProductDetails(productId, productConfigurationId)
         if (productDetailsInfo.code === 'SS') {
            var imageArray = productDetailsInfo.data.productImages?.map((productImage) => productImage.image)
            imageArray.splice(0, 1)
            setImagesDetail(imageArray)
            setProductDetails(productDetailsInfo.data.productDetails)
            setProductColors((prev) => {
               const productColors = productDetailsInfo.data.productColors
               setProductColorId(productColors[0]?.productColorId)
               return productColors
            })
         }
      }

      handleGetProductDetails(productId, productConfigurationId)
   }, [productId, productConfigurationId])

   useEffect(() => {
      const groupConfigs = document.querySelectorAll('.groupConfig')
      groupConfigs.forEach((groupConfig) =>
         groupConfig.addEventListener('click', () => {
            const ul = groupConfig.querySelector('ul')
            const i = groupConfig.querySelector('i')
            if (ul.style.display === 'none' || ul.style.display === '') {
               i.style.transform = 'rotate(180deg)'
               ul.style.display = 'block'
            } else {
               ul.style.display = 'none'
               i.style.transform = 'rotate(360deg)'
            }
         }),
      )
   }, [])

   function handleIncrease(maxValue) {
      setQuantity((perv) => {
         const nextValue = perv + 1
         return nextValue > maxValue ? perv : nextValue
      })
   }

   function handleDecrease(minValue) {
      setQuantity((perv) => {
         const nextValue = perv - 1
         return nextValue < minValue ? perv : nextValue
      })
   }

   function handleQuantityChange(minValue, maxValue, value) {
      setQuantity((perv) => {
         const nextValue = parseInt(value === '' ? 0 : value)
         return nextValue < minValue || nextValue > maxValue ? perv : nextValue
      })
   }

   async function handleAddToCart() {
      if (!localStorage.getItem('userInfo')) {
         navigate('/login')
      } else {
         const cartInfo = JSON.parse(localStorage.getItem('cartInfo'))
         console.log(cartInfo.cartId)
         if (cartInfo) {
            const cartItem = {
               cartId: cartInfo.cartId,
               productId,
               productConfigurationId,
               productColorId,
               quantity: quantity === '' || quantity === '0' ? 1 : quantity,
               price: productDetails.productInfo.discountPrice || productDetails.productInfo.price,
               totalPrice:
                  quantity * productDetails.productInfo.discountPrice || quantity * productDetails.productInfo.price,
               productDiscountIds: productDetails.productInfo.productDiscounts?.map(
                  (productDiscount) => productDiscount.productDiscountId,
               ),
            }
            if (cartItem.quantity > 0) {
               const result = await addCartItem(cartItem)
               if (result.code === 'SS') {
                  dispatch(setShowToast(true, 'success', 'Thêm vào giỏ hàng thành công!'))
                  navigate(-1)
               }
            } else {
               dispatch(setShowToast(true, 'error', 'Số sản phẩm phải lớn lơn 0!'))
            }
         } else {
            dispatch(setShowToast(true, 'error', 'Nhân viên không đặc hàng!'))
         }
      }
   }

   async function handleBuyNow() {
      const cartInfo = JSON.parse(localStorage.getItem('cartInfo'))
      if (cartInfo) {
         const cartItem = {
            cartId: cartInfo.cartId,
            productId,
            productConfigurationId,
            productColorId,
            quantity: quantity === '' || quantity === '0' ? 1 : quantity,
            price: productDetails.productInfo.discountPrice || productDetails.productInfo.price,
            totalPrice:
               quantity * productDetails.productInfo.discountPrice || quantity * productDetails.productInfo.price,
            productDiscountIds: productDetails.productInfo.productDiscounts?.map(
               (productDiscount) => productDiscount.productDiscountId,
            ),
         }
         if (cartItem.quantity > 0) {
            const result = await addCartItem(cartItem)
            const resultCreate = await createOrder(cartItem)
            if (resultCreate.code === 'SS') {
               dispatch(setShowToast(true, 'success', 'Đặt hàng thành công!'))
            } else {
               dispatch(setShowToast(false, 'error ', 'Đặt hàng thất bại!'))
            }
         } else {
            dispatch(setShowToast(true, 'error', 'Số sản phẩm phải lớn lơn 0!'))
         }
      } else {
         dispatch(setShowToast(true, 'error', 'Nhân viên không mua hàng!'))
      }
   }

   return (
      <Modal>
         <div className={styles.wrapper}>
            <div className={styles.contentLeft}>
               <div className={styles.wrapperSlider}>
                  <Slider imageArray={imagesDetail} widthSlide={widthSlide} maxWidthSlide={maxWidthSlide} />
               </div>
               <div className={styles.wrapperConfig}>
                  <h3 className={styles.title}>THÔNG SỐ KỸ THUẬT</h3>
                  <div className={clsx('groupConfig', styles.groupConfig)}>
                     <h3 className={styles.titleConfig}>
                        Cấu hình & Bộ nhớ
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={styles.listConfig}>
                        {productDetails.productConfiguration.operatingSystem && (
                           <li className={styles.configItem}>
                              <aside>Hệ điều hành</aside>
                              <aside>{productDetails.productConfiguration.operatingSystem}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.core && (
                           <li className={styles.configItem}>
                              <aside>Số nhân</aside>
                              <aside>{productDetails.productConfiguration.core}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.threads && (
                           <li className={styles.configItem}>
                              <aside>Số luồng</aside>
                              <aside>{productDetails.productConfiguration.threads}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.cpuSpeed && (
                           <li className={styles.configItem}>
                              <aside>Tốc độ CPU</aside>
                              <aside>{productDetails.productConfiguration.cpuSpeed}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.maxSpeed && (
                           <li className={styles.configItem}>
                              <aside>Tốc độ tối đa</aside>
                              <aside>{productDetails.productConfiguration.maxSpeed}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.gpu && (
                           <li className={styles.configItem}>
                              <aside>Chip đồ họa (GPU)</aside>
                              <aside>{productDetails.productConfiguration.gpu}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.ram && (
                           <li className={styles.configItem}>
                              <aside>RAM</aside>
                              <aside>{productDetails.productConfiguration.ram}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.ramType && (
                           <li className={styles.configItem}>
                              <aside>Loại RAM</aside>
                              <aside>{productDetails.productConfiguration.ramType}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.storageCapacity && (
                           <li className={styles.configItem}>
                              <aside>Dung lượng lưu trữ</aside>
                              <aside>{productDetails.productConfiguration.storageCapacity}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.availableStorageCapacity && (
                           <li className={styles.configItem}>
                              <aside>Dung lượng khả dụng</aside>
                              <aside>{productDetails.productConfiguration.availableStorageCapacity}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', styles.groupConfig)}>
                     <h3 className={styles.titleConfig}>
                        Camera & Màn hình
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={styles.listConfig}>
                        {productDetails.productConfiguration.backCamera && (
                           <li className={styles.configItem}>
                              <aside>Camera sau</aside>
                              <aside>{productDetails.productConfiguration.backCamera}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.backCameraTechnology && (
                           <li className={styles.configItem}>
                              <aside>Tính năng camera sau</aside>
                              <aside>{productDetails.productConfiguration.backCameraTechnology}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.frontCamera && (
                           <li className={styles.configItem}>
                              <aside>Camera trước</aside>
                              <aside>{productDetails.productConfiguration.frontCamera}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.frontCameraTechnology && (
                           <li className={styles.configItem}>
                              <aside>Tính năng camera trước</aside>
                              <aside>{productDetails.productConfiguration.frontCameraTechnology}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.monitor && (
                           <li className={styles.configItem}>
                              <aside>Màn hình</aside>
                              <aside>{productDetails.productConfiguration.monitor}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.monitorTechnology && (
                           <li className={styles.configItem}>
                              <aside>Công nghệ màn hình</aside>
                              <aside>{productDetails.productConfiguration.monitorTechnology}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.refreshRate && (
                           <li className={styles.configItem}>
                              <aside>Tầng số quét</aside>
                              <aside>{productDetails.productConfiguration.refreshRate}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.colorCoverage && (
                           <li className={styles.configItem}>
                              <aside>Độ phủ màu</aside>
                              <aside>{productDetails.productConfiguration.colorCoverage}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.brightness && (
                           <li className={styles.configItem}>
                              <aside>Độ sáng</aside>
                              <aside>{productDetails.productConfiguration.brightness}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', styles.groupConfig)}>
                     <h3 className={styles.titleConfig}>
                        PIN & Sạc
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={styles.listConfig}>
                        {productDetails.productConfiguration.charging && (
                           <li className={styles.configItem}>
                              <aside>Sạc</aside>
                              <aside>{productDetails.productConfiguration.charging}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', styles.groupConfig)}>
                     <h3 className={styles.titleConfig}>
                        Kết nối
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={styles.listConfig}>
                        {productDetails.productConfiguration.port && (
                           <li className={styles.configItem}>
                              <aside>Cổng giao tiếp</aside>
                              <aside>{productDetails.productConfiguration.port}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.wireless && (
                           <li className={styles.configItem}>
                              <aside>Kết nối không dây</aside>
                              <aside>{productDetails.productConfiguration.wireless}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', styles.groupConfig)}>
                     <h3 className={styles.titleConfig}>
                        Thiết kế & Chất liệu
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={styles.listConfig}>
                        {productDetails.productConfiguration.material && (
                           <li className={styles.configItem}>
                              <aside>Chất liệu</aside>
                              <aside>{productDetails.productConfiguration.material}</aside>
                           </li>
                        )}
                        {productDetails.productConfiguration.weight && (
                           <li className={styles.configItem}>
                              <aside>Khối lượng</aside>
                              <aside>{productDetails.productConfiguration.weight}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
               </div>
            </div>
            <div className={styles.contentRight}>
               <div className={styles.rightHeader}>
                  <h3 className={styles.productInfoTitle}>Thông tin sản phẩm</h3>
               </div>
               <div className={styles.rightBody}>
                  <h3 className={styles.productName}>
                     {productDetails.productInfo.name + ' '}
                     {productDetails.productConfiguration.storageCapacity + ' '}
                     {productDetails.productConfiguration.cpu + ' '}
                     {productDetails.productConfiguration.gpu}
                  </h3>
                  <div className={styles.productPrice}>
                     <strong>Giá sản phẩm:</strong>
                     {productDetails.productInfo.discountPrice && (
                        <Fragment>
                           <h4 className={styles.oldPrice}>{currencyFormat(productDetails.productInfo.price)}</h4>
                           <span>{`-`}</span>
                        </Fragment>
                     )}

                     <h4 className={styles.newPrice}>
                        {currencyFormat(
                           productDetails.productInfo.discountPrice
                              ? productDetails.productInfo.discountPrice
                              : productDetails.productInfo.price,
                        )}
                     </h4>
                  </div>
                  {productDetails.productInfo.productDiscounts?.length > 0 && (
                     <div className={styles.salePanel}>
                        <h4 className={styles.saleTitle}>KHUYẾN MÃI</h4>
                        <div className={styles.saleBody}>
                           <ul className={styles.listSale}>
                              {productDetails.productInfo.productDiscounts.map((productDiscount, index) => (
                                 <li key={index} className={styles.listSaleItem}>
                                    <strong>
                                       {productDiscount.name}{' '}
                                       {`${productDiscount.price}`.includes('%')
                                          ? productDiscount.price
                                          : curencyFormat(productDiscount.price)}
                                    </strong>
                                    <p>
                                       Áp dụng từ {dateFormat(productDiscount.startDate)} -{' '}
                                       {dateFormat(productDiscount.endDate)}
                                    </p>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  )}
                  <div className={styles.groupProductColor}>
                     <strong>Màu sắc:</strong>
                     {productColors.map((productColor) => (
                        <div
                           key={productColor.productColorId}
                           className={clsx(styles.productColor, {
                              [styles.productColorActive]: productColorId === productColor.productColorId,
                           })}
                           onClick={() => setProductColorId(productColor.productColorId)}
                        >
                           <div className={styles.color} style={{ backgroundColor: `${productColor.color}` }}></div>
                           <span>{productColor.name}</span>
                        </div>
                     ))}
                  </div>
                  <div className={styles.groupProductQuantity}>
                     <strong>Số lượng</strong>
                     <Quantity
                        quantity={quantity}
                        onIncrease={() => handleIncrease(productDetails.productInfo.quantity)}
                        onDecrease={() => handleDecrease(0)}
                        onChange={(e) => handleQuantityChange(0, productDetails.productInfo.quantity, e.target.value)}
                     />
                     <p className={styles.availableQuantity}>Số lượng có sẳn: {productDetails.productInfo.quantity}</p>
                  </div>
               </div>
               <div className={styles.rightFooter}>
                  <button className={clsx(styles.btn, styles.btnBuyNow)} onClick={handleBuyNow}>
                     <i className="fa-solid fa-dollar-sign"></i>Mua ngay
                  </button>
                  <button className={clsx(styles.btn, styles.btnAddToCart)} onClick={handleAddToCart}>
                     <i className="fa-solid fa-cart-plus"></i>Thêm vào giỏ
                  </button>
               </div>
            </div>
         </div>
      </Modal>
   )
}
export default ProductDetail
