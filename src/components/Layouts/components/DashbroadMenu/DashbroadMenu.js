import { useEffect, useState } from 'react'
import clsx from 'clsx'
import cssDashbroadMenu from './DashbroadMenu.module.css'
import { Link } from 'react-router-dom'
function DashbroadMenu({ title, pagination, objectHandle, viewAll, addNews = [] }) {
   const [isOpen, setIsOpen] = useState(false)
   const [rotateIcon, setRotateIcon] = useState('0deg')

   function handleToggleDropDown() {
      setIsOpen((prev) => {
         const newState = !prev
         setRotateIcon(newState ? '-180deg' : '0deg')
         return newState
      })
   }

   return (
      <div className={cssDashbroadMenu.selectMenu}>
         <div className={cssDashbroadMenu.groupTitle} onClick={handleToggleDropDown}>
            <i className={clsx('fa-solid fa-heart', cssDashbroadMenu.menuIcon)}></i>
            <h3 className={cssDashbroadMenu.menuTitle}>
               {title}
               <i style={{ transform: `rotate(${rotateIcon})` }} className="fa-solid fa-circle-chevron-up"></i>
            </h3>
         </div>
         {isOpen && (
            <ul className={cssDashbroadMenu.listMenu}>
               <li className={cssDashbroadMenu.menuOption}>
                  <Link
                     to={pagination ? `/dashbroad/${objectHandle}/page/1` : `/dashbroad/${objectHandle}`}
                     className={cssDashbroadMenu.menuLink}
                  >
                     {viewAll}
                  </Link>
               </li>
               {addNews.map((addNew, index) => (
                  <li key={index} className={cssDashbroadMenu.menuOption}>
                     <Link
                        to={`/dashbroad/${objectHandle}${
                           addNew.objectChildren ? `/${addNew.objectChildren}` : ''
                        }/create`}
                        className={cssDashbroadMenu.menuLink}
                     >
                        {addNew.title}
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default DashbroadMenu
