import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import cssSidebar from './Sidebar.module.css'
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
         icon: `${cssSidebar.menuIcon} `,
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
      <div className={cssSidebar.sidebar}>
         <ul className={cssSidebar.menuList}>
            <li
               className={clsx(cssSidebar.menuItem, {
                  [cssSidebar.active]: activeMenu === 'home',
               })}
               onClick={() => {
                  setActiveMenu('home')
               }}
            >
               <Link className={cssSidebar.menuLink} to="/">
                  <i className={clsx('fa-solid fa-house', cssSidebar.menuIcon)}></i>
                  Trang chủ
               </Link>
            </li>
            <li
               className={clsx(cssSidebar.menuItem, {
                  [cssSidebar.active]: activeMenu === 'phone',
               })}
               onClick={() => {
                  setActiveMenu('phone')
               }}
            >
               <Link className={cssSidebar.menuLink} to="/phones">
                  <i className={clsx('fa-solid fa-mobile', cssSidebar.menuIcon)}></i>
                  Điện thoại
               </Link>
            </li>
            <li
               className={clsx(cssSidebar.menuItem, {
                  [cssSidebar.active]: activeMenu === 'laptop',
               })}
               onClick={() => {
                  setActiveMenu('laptop')
               }}
            >
               <Link className={cssSidebar.menuLink} to="/laptops">
                  <i className={clsx('fa-solid fa-laptop', cssSidebar.menuIcon)}></i>
                  Laptop
               </Link>
            </li>
            {localStorage.getItem('cartInfo') && (
               <li
                  className={clsx(cssSidebar.menuItem, {
                     [cssSidebar.active]: activeMenu === 'cart',
                  })}
                  onClick={() => {
                     setActiveMenu('cart')
                  }}
               >
                  <Link className={cssSidebar.menuLink} to="/cart">
                     <i className={clsx('fa-solid fa-cart-shopping', cssSidebar.menuIcon)}></i>
                     Giỏ hàng
                  </Link>
               </li>
            )}
         </ul>
         {state.isLogin && checkPermission(userInfo?.roles) && (
            <Link to="/dashbroad/products/page/1" className={cssSidebar.menuItem}>
               <i className={clsx(cssSidebar.menuIcon, 'fa-solid fa-screwdriver-wrench')}></i>
               Quản trị
            </Link>
         )}
      </div>
   )
}

export default Sidebar
