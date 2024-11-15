import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import Slider from '../Slider/Slider'
import cssProductDetail from './ProductDetail.module.css'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import curencyFormat from '../../../utils/currencyFormat'
import { getProductDetails } from '../../../services/productServices'
function ProductDetail() {
   const params = useParams()
   const [imagesDetail, setImagesDetail] = useState([])
   const [productInfo, setProductInfo] = useState([])
   const [productConfiguration, setProductConfiguration] = useState([])
   const widthSlide = 680
   const maxWidthSlide = (imagesDetail.length - 1) * widthSlide * -1

   async function getProductDetail(productId) {
      const productDetail = await getProductDetails(productId)
      if (productDetail.code === 'SS') {
         var imageArray = productDetail.data.productImages?.map((productImage) => productImage.image)
         imageArray.splice(0, 1)
         setImagesDetail(imageArray)
         setProductInfo(productDetail.data.productInfo)
         setProductConfiguration(productDetail.data.productConfiguration)
      }
   }

   useEffect(() => {
      getProductDetail(params.productId)
   }, [params.productId])

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

   return (
      <Modal>
         <div className={cssProductDetail.wrapper}>
            <div className={cssProductDetail.contentLeft}>
               <div className={cssProductDetail.wrapperSlider}>
                  <Slider imageArray={imagesDetail} widthSlide={widthSlide} maxWidthSlide={maxWidthSlide} />
               </div>
               <div className={cssProductDetail.wrapperConfig}>
                  <h3 className={cssProductDetail.title}>THÔNG SỐ KỸ THUẬT</h3>
                  <div className={clsx('groupConfig', cssProductDetail.groupConfig)}>
                     <h3 className={cssProductDetail.titleConfig}>
                        Cấu hình & Bộ nhớ
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={cssProductDetail.listConfig}>
                        {productConfiguration.operatingSystem && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Hệ điều hành</aside>
                              <aside>{productConfiguration.operatingSystem}</aside>
                           </li>
                        )}
                        {productConfiguration.core && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Số nhân</aside>
                              <aside>{productConfiguration.core}</aside>
                           </li>
                        )}
                        {productConfiguration.SOLUONG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Số luồng</aside>
                              <aside>{productConfiguration.SOLUONG}</aside>
                           </li>
                        )}
                        {productConfiguration.DUNGLUONGKHADUNG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Dung lượng khả dụng</aside>
                              <aside>{productConfiguration.DUNGLUONGKHADUNG}</aside>
                           </li>
                        )}
                        {productConfiguration.TOCDOCPU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Tốc độ CPU</aside>
                              <aside>{productConfiguration.TOCDOCPU}</aside>
                           </li>
                        )}
                        {productConfiguration.TOCDOTOIDA && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Tốc độ tối đa</aside>
                              <aside>{productConfiguration.TOCDOTOIDA}</aside>
                           </li>
                        )}
                        {productConfiguration.GPU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Chip đồ họa (GPU)</aside>
                              <aside>{productConfiguration.GPU}</aside>
                           </li>
                        )}
                        {productConfiguration.RAM && (
                           <li className={cssProductDetail.configItem}>
                              <aside>RAM</aside>
                              <aside>{productConfiguration.RAM}</aside>
                           </li>
                        )}
                        {productConfiguration.LOAIRAM && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Loại RAM</aside>
                              <aside>{productConfiguration.LOAIRAM}</aside>
                           </li>
                        )}
                        {productConfiguration.DUNGLUONG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Dung lượng lưu trữ</aside>
                              <aside>{productConfiguration.DUNGLUONG}</aside>
                           </li>
                        )}
                        {productConfiguration.DUNGLUONGKHADUNG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Dung lượng khả dụng</aside>
                              <aside>{productConfiguration.DUNGLUONGKHADUNG}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', cssProductDetail.groupConfig)}>
                     <h3 className={cssProductDetail.titleConfig}>
                        Camera & Màn hình
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={cssProductDetail.listConfig}>
                        {productConfiguration.CAMERASAU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Camera sau</aside>
                              <aside>{productConfiguration.CAMERASAU}</aside>
                           </li>
                        )}
                        {productConfiguration.CONGNGHECAMERASAU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Tính năng camera sau</aside>
                              <aside>{productConfiguration.CONGNGHECAMERASAU}</aside>
                           </li>
                        )}
                        {productConfiguration.CAMERATRUOC && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Camera trước</aside>
                              <aside>{productConfiguration.CAMERATRUOC}</aside>
                           </li>
                        )}
                        {productConfiguration.CONGNGHECAMERATRUOC && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Tính năng camera trước</aside>
                              <aside>{productConfiguration.CONGNGHECAMERATRUOC}</aside>
                           </li>
                        )}
                        {productConfiguration.MANHINH && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Màn hình</aside>
                              <aside>{productConfiguration.MANHINH}</aside>
                           </li>
                        )}
                        {productConfiguration.CONGNGHEMANHINH && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Công nghệ màn hình</aside>
                              <aside>{productConfiguration.CONGNGHEMANHINH}</aside>
                           </li>
                        )}
                        {productConfiguration.TANGSOQUET && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Tầng số quét</aside>
                              <aside>{productConfiguration.TANGSOQUET}</aside>
                           </li>
                        )}
                        {productConfiguration.DOPHUMAU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Độ phủ màu</aside>
                              <aside>{productConfiguration.DOPHUMAU}</aside>
                           </li>
                        )}
                        {productConfiguration.DOSANG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Độ sáng</aside>
                              <aside>{productConfiguration.DOSANG}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', cssProductDetail.groupConfig)}>
                     <h3 className={cssProductDetail.titleConfig}>
                        PIN & Sạc
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={cssProductDetail.listConfig}>
                        {productConfiguration.SAC && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Sạc</aside>
                              <aside>{productConfiguration.SAC}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', cssProductDetail.groupConfig)}>
                     <h3 className={cssProductDetail.titleConfig}>
                        Kết nối
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={cssProductDetail.listConfig}>
                        {productConfiguration.SAC && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Cổng giao tiếp</aside>
                              <aside>{productConfiguration.SAC}</aside>
                           </li>
                        )}
                        {productConfiguration.KHONGDAY && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Kết nối không dây</aside>
                              <aside>{productConfiguration.KHONGDAY}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
                  <div className={clsx('groupConfig', cssProductDetail.groupConfig)}>
                     <h3 className={cssProductDetail.titleConfig}>
                        Thiết kế & Chất liệu
                        <i className="fa-solid fa-circle-chevron-up"></i>
                     </h3>
                     <ul className={cssProductDetail.listConfig}>
                        {productConfiguration.CHATLIEU && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Chất liệu</aside>
                              <aside>{productConfiguration.CHATLIEU}</aside>
                           </li>
                        )}
                        {productConfiguration.KHOILUONG && (
                           <li className={cssProductDetail.configItem}>
                              <aside>Khối lượng</aside>
                              <aside>{productConfiguration.KHOILUONG}</aside>
                           </li>
                        )}
                     </ul>
                  </div>
               </div>
            </div>
            <div className={cssProductDetail.contentRight}>
               <div className={cssProductDetail.rightHeader}>
                  <h3 className={cssProductDetail.productInfoTitle}>Thông tin sản phẩm</h3>
               </div>
               <div className={cssProductDetail.rightBody}>
                  <h3>{productInfo.TENSP}</h3>
                  <h4 className={cssProductDetail.productPrice}>Giá sản phẩm: {curencyFormat(productInfo.GIASP)}</h4>
                  {
                     <div className={cssProductDetail.salePanel}>
                        <h4 className={cssProductDetail.saleTitle}>
                           KHUYẾN MÃI
                           <p>Áp dụng từ 13/11/2024 - 15/11/2024</p>
                        </h4>
                        <div className={cssProductDetail.saleBody}>
                           <ul className={cssProductDetail.listSale}>
                              <li className={cssProductDetail.listSaleItem}>Giảm 500k cho HSSV</li>
                              <li className={cssProductDetail.listSaleItem}>Giảm 20% tháng 11</li>
                           </ul>
                        </div>
                     </div>
                  }
               </div>
               <div className={cssProductDetail.rightFooter}>
                  <button className={clsx(cssProductDetail.btn, cssProductDetail.btnBuyNow)}>
                     <i class="fa-solid fa-dollar-sign"></i>Mua ngay
                  </button>
                  <button className={clsx(cssProductDetail.btn, cssProductDetail.btnAddToCart)}>
                     <i class="fa-solid fa-cart-plus"></i>Thêm vào giỏ
                  </button>
               </div>
            </div>
         </div>
      </Modal>
   )
}
export default ProductDetail
