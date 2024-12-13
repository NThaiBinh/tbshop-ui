import { useState } from 'react'
import clsx from 'clsx'
import styles from './DashbroadMenu.module.css'
import { Link } from 'react-router-dom'
function DashbroadMenu({ title, pagination, objectHandle, viewAlls = [], addNews = [] }) {
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
      <div className={styles.selectMenu}>
         <div className={styles.groupTitle} onClick={handleToggleDropDown}>
            <i className={clsx('fa-solid fa-heart', styles.menuIcon)}></i>
            <h3 className={styles.menuTitle}>
               {title}
               <i style={{ transform: `rotate(${rotateIcon})` }} className="fa-solid fa-circle-chevron-up"></i>
            </h3>
         </div>
         {isOpen && (
            <ul className={styles.listMenu}>
               {viewAlls.map((viewAll, index) => (
                  <li key={index} className={styles.menuOption}>
                     <Link
                        to={pagination ? `/dashbroad/${viewAll.objectView}/page/1` : `/dashbroad/${viewAll.objectView}`}
                        className={styles.menuLink}
                     >
                        {viewAll.title}
                     </Link>
                  </li>
               ))}
               {addNews.map((addNew, index) => (
                  <li key={index} className={styles.menuOption}>
                     <Link
                        to={`/dashbroad/${objectHandle}${
                           addNew.objectChildren ? `/${addNew.objectChildren}` : ''
                        }/create`}
                        className={styles.menuLink}
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
