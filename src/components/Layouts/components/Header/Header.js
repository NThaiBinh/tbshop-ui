import { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import Authen from '../Authen/Authen'
import cssHeader from './Header.module.css'
import UserInfo from '../UserInfo/UserInfo'
import StoreContext from '../../../../store/StoreContext'

function Header() {
   const [state, dispatch] = useContext(StoreContext)

   return (
      <header id={cssHeader.header}>
         <Link className={cssHeader.logo} to="/">
            <img className={cssHeader.logoImg} src="http://localhost:3001/images/1.png" alt="Logo" />
            <h2 className={cssHeader.storeName}>TBSHOP</h2>
         </Link>
         <SearchInput />
         {state.isLogin ? <UserInfo /> : <Authen />}
      </header>
   )
}

export default Header
