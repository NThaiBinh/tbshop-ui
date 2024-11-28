import { Fragment } from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import cssDefaultLayout from './DefaultlLayout.module.css'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
   const location = useLocation()

   return (
      <Fragment>
         <Header />
         <div className={cssDefaultLayout.container}>
            <Sidebar />
            <div className={cssDefaultLayout.content}>
               {children}
               <Footer />
            </div>
         </div>
      </Fragment>
   )
}

export default DefaultLayout
