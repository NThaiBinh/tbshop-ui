import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import Authen from '../Authen/Authen'
import cssHeader from './Header.module.css'
import UserInfo from '../UserInfo/UserInfo'
import StoreContext from '../../../../store/StoreContext'
import { imageApi } from '../../../../services'
import { getStoreInfo } from '../../../../services/storeServices'

function Header() {
   const [state, dispatch] = useContext(StoreContext)

   const [storeInfo, setStoreInfo] = useState({})

   useEffect(() => {
      async function handleGetStoreInfo() {
         const result = await getStoreInfo()
         if (result.code === 'SS') {
            setStoreInfo(result.data)
         }
      }

      handleGetStoreInfo()
   }, [state.isUpdate])

   return (
      <header id={cssHeader.header}>
         <Link className={cssHeader.logo} to="/">
            <img className={cssHeader.logoImg} src={`${imageApi}/${storeInfo.image}`} alt="Logo" />
            <h2 className={cssHeader.storeName}>{storeInfo.name}</h2>
         </Link>
         <SearchInput />
         {state.isLogin ? <UserInfo /> : <Authen />}
      </header>
   )
}

export default Header
