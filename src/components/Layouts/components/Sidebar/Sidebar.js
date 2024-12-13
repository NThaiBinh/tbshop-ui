import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Sidebar.module.css'
import StoreContext from '../../../../store/StoreContext'

function Sidebar() {
   const [state, dispatch] = useContext(StoreContext)
   const [activeMenu, setActiveMenu] = useState('home')
   const [userInfo, setUserInfo] = useState()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [state.isLogin])

   const menuItems = [
      {
         id: 'clock',
         href: '/products/clock',
         icon: `${styles.menuIcon} `,
         title: 'Đồng hồ',
      },
      {
         id: 'cart',
         href: '/cart',
         icon: ``,
         title: 'Giỏ hàng',
      },
   ]
   function checkPermission(roles) {
      if (Array.isArray(roles)) return roles.some((role) => role === 'admin' || role === 'editor')
      return false
   }
   return (
      <div className={styles.sidebar}>
         <ul className={styles.menuList}>
            <li
               className={clsx(styles.menuItem, {
                  [styles.active]: activeMenu === 'home',
               })}
               onClick={() => {
                  setActiveMenu('home')
               }}
            >
               <Link className={styles.menuLink} to="/">
                  <i className={clsx('fa-solid fa-house', styles.menuIcon)}></i>
                  Trang chủ
               </Link>
            </li>
            <li
               className={clsx(styles.menuItem, {
                  [styles.active]: activeMenu === 'phone',
               })}
               onClick={() => {
                  setActiveMenu('phone')
               }}
            >
               <Link className={styles.menuLink} to="/phones">
                  <i className={clsx('fa-solid fa-mobile', styles.menuIcon)}></i>
                  Điện thoại
               </Link>
            </li>
            <li
               className={clsx(styles.menuItem, {
                  [styles.active]: activeMenu === 'laptop',
               })}
               onClick={() => {
                  setActiveMenu('laptop')
               }}
            >
               <Link className={styles.menuLink} to="/laptops">
                  <i className={clsx('fa-solid fa-laptop', styles.menuIcon)}></i>
                  Laptop
               </Link>
            </li>
            {localStorage.getItem('cartInfo') && (
               <li
                  className={clsx(styles.menuItem, {
                     [styles.active]: activeMenu === 'cart',
                  })}
                  onClick={() => {
                     setActiveMenu('cart')
                  }}
               >
                  <Link className={styles.menuLink} to="/cart">
                     <i className={clsx('fa-solid fa-cart-shopping', styles.menuIcon)}></i>
                     Giỏ hàng
                  </Link>
               </li>
            )}
         </ul>
         {state.isLogin && checkPermission(userInfo?.roles) && (
            <Link to="/dashbroad/statistical" className={styles.menuItem}>
               <i className={clsx(styles.menuIcon, 'fa-solid fa-screwdriver-wrench')}></i>
               Quản trị
            </Link>
         )}
      </div>
   )
}

export default Sidebar
