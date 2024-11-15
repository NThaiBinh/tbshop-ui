import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import SearchInput from '../SearchInput/SearchInput'
import Authen from '../Authen/Authen'
import cssHeader from './Header.module.css'
import CustomerInfo from '../CustomerInfo/CustomerInfo'
import { Link } from 'react-router-dom'
import { getCustomerInfo } from '../../../../services/customerServices'

function Header() {
   const [customerInfo, setCustomerInfo] = useState({})

   const customerId = Cookies.get('customerId')
   useEffect(() => {
      async function getCustomerInfoHandle(customerId) {
         const info = await getCustomerInfo(customerId)

         if (info) {
            setCustomerInfo(info)
         }
      }
      if (customerId) {
         getCustomerInfoHandle(customerId)
      }
   }, [customerId])

   return (
      <header id={cssHeader.header}>
         <Link className={cssHeader.logo} to="/">
            <img className={cssHeader.logoImg} src="http://localhost:3001/images/1.png" alt="Logo" />
            <h2 className={cssHeader.storeName}>TBSHOP</h2>
         </Link>
         <SearchInput />
         {customerId ? <CustomerInfo image={customerInfo.ANHKH} name={customerInfo.TENKH} /> : <Authen />}
      </header>
   )
}

export default Header
