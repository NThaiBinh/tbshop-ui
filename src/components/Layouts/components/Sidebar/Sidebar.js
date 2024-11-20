import { useEffect, useState } from 'react'
import cssSidebar from './Sidebar.module.css'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

function Sidebar({ isAdmin = true }) {
   const [activeMenu, setActiveMenu] = useState('home')

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
         href: '/',
         icon: `${cssSidebar.menuIcon} fa-solid fa-cart-shopping`,
         title: 'Giỏ hàng',
      },
   ]
   return (
      <div className={cssSidebar.sidebar}>
         <ul className={cssSidebar.menuList}>
            {menuItems.map((menuItem, index) => (
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
            ))}
         </ul>
         {isAdmin && (
            <Link to="/dashbroad/products/page/1" className={cssSidebar.menuItem}>
               <i className={clsx(cssSidebar.menuIcon, 'fa-solid fa-screwdriver-wrench')}></i>
               Quản trị
            </Link>
         )}
      </div>
   )
}

export default Sidebar
