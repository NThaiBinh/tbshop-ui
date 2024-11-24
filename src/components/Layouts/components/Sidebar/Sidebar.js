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
         id: 'home',
         href: '/',
         icon: `${cssSidebar.menuIcon} fa-solid fa-house`,
         title: 'Trang chủ',
      },
      {
         id: 'phone',
         href: '/products/phone',
         icon: `${cssSidebar.menuIcon} fa-solid fa-mobile`,
         title: 'Điện thoại',
      },
      {
         id: 'laptop',
         href: '/products',
         icon: `${cssSidebar.menuIcon} fa-solid fa-laptop`,
         title: 'Laptop',
      },
      {
         id: 'clock',
         href: '/products/clock',
         icon: `${cssSidebar.menuIcon} fa-solid fa-clock`,
         title: 'Đồng hồ',
      },
      {
         id: 'cart',
         href: '/cart',
         icon: `${cssSidebar.menuIcon} fa-solid fa-cart-shopping`,
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
            {menuItems.map((menuItem, index) => {
               if (menuItem.id === 'cart' && !localStorage.getItem('cartInfo')) {
                  return undefined
               }
               return (
                  <li
                     key={index}
                     className={clsx(cssSidebar.menuItem, {
                        [cssSidebar.active]: menuItem.id === activeMenu,
                     })}
                     onClick={() => {
                        setActiveMenu(menuItem.id)
                     }}
                  >
                     <Link className={cssSidebar.menuLink} to={menuItem.href}>
                        <i className={menuItem.icon}></i>
                        {menuItem.title}
                     </Link>
                  </li>
               )
            })}
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
