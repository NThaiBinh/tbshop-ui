import clsx from 'clsx'
import cssDashbroadMenu from './DashbroadMenu.module.css'
import { Link } from 'react-router-dom'
function DashbroadMenu({ title, pagination, objectHandle, viewAll, addNews = [] }) {
   return (
      <div className={cssDashbroadMenu.selectMenu}>
         <div className={cssDashbroadMenu.menuTitle}>
            <i className={clsx('fa-solid fa-heart', cssDashbroadMenu.menuIcon)}></i>
            <h3>{title}</h3>
         </div>
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
                     to={`/dashbroad/${objectHandle}${addNew.objectChildren ? `/${addNew.objectChildren}` : ''}/create`}
                     className={cssDashbroadMenu.menuLink}
                  >
                     {addNew.title}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default DashbroadMenu
