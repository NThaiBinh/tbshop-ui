import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Footer.module.css'
import { useEffect, useState } from 'react'
import { getStoreInfo } from '../../../../services/storeServices'

function Footer() {
   const navigate = useNavigate()
   const [storeInfo, setStoreInfo] = useState()

   useEffect(() => {
      async function handleGetStoreInfo() {
         const store = await getStoreInfo()
         if (store.code === 'SS') {
            setStoreInfo(store.data)
         }
      }
      handleGetStoreInfo()
   }, [])

   return (
      <div className={styles.wrapper}>
         <div className={styles.content}>
            <div className={clsx(styles.footerContent, styles.left)}>
               <h2>VỀ CHÚNG TÔI</h2>
               <ul className={styles.listInfo}>
                  <li>
                     <i className="fa-solid fa-signature"></i>
                     {storeInfo?.name}
                  </li>
                  <li>
                     <i className="fa-solid fa-phone"></i>
                     {storeInfo?.phoneNumber}
                  </li>
                  <li>
                     <i className="fa-solid fa-envelope"></i>
                     {storeInfo?.email}
                  </li>
                  <li>
                     <i className="fa-solid fa-location-dot"></i>
                     {storeInfo?.address}
                  </li>
               </ul>
            </div>
            <div className={styles.line}></div>
            <div className={clsx(styles.footerContent, styles.center)}>
               <h2>KHÁM PHÁ</h2>
               <ul className={styles.listInfo}>
                  <li onClick={() => navigate('/')}>
                     <i className="fa-solid fa-house"></i>
                     Trang chủ
                  </li>
                  <li onClick={() => navigate('/phones')}>
                     <i className="fa-solid fa-mobile"></i>
                     Điện thoại
                  </li>
                  <li onClick={() => navigate('/laptops')}>
                     <i className="fa-solid fa-laptop"></i>
                     Laptop
                  </li>
                  <li onClick={() => navigate('/cart')}>
                     <i className="fa-solid fa-cart-shopping"></i>
                     Giỏ hàng
                  </li>
               </ul>
            </div>
            <div className={styles.line}></div>
            <div className={clsx(styles.footerContent, styles.right)}>
               <h2>MẠNG XẢ HỘI</h2>
               <ul className={styles.listInfo}>
                  <li className={styles.listItem}>
                     <i className="fa-brands fa-facebook"></i>
                     Facebook
                  </li>
                  <li className={styles.listItem}>
                     <i className="fa-brands fa-tiktok"></i>
                     TikTok
                  </li>
                  <li className={styles.listItem}>
                     <i className="fa-brands fa-square-instagram"></i>
                     Instagram
                  </li>
                  <li className={styles.listItem}>
                     <i className="fa-brands fa-youtube"></i>
                     Youtube
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Footer
