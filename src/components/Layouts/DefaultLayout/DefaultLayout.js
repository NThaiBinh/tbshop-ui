import { Fragment } from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import cssDefaultLayout from './DefaultlLayout.module.css'

function DefaultLayout({ children }) {
   return (
      <Fragment>
         <Header />
         <div className={cssDefaultLayout.container}>
            <Sidebar />
            <div className={cssDefaultLayout.content}>{children}</div>
         </div>
      </Fragment>
   )
}

export default DefaultLayout
