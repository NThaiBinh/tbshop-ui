import { useContext, useEffect, useState } from 'react'
import cssUserInfo from './UserInfo.module.css'
import defaultAvatar from '../images/default_avatar.jpg'
import { logout } from '../../../../services/authServices'
import StoreContext from '../../../../store/StoreContext'
import { setIsLogin, setShowToast } from '../../../../store/actions'
import { useNavigate } from 'react-router-dom'
const imageLink = 'http://localhost:3001'

function InfoCustomer() {
   const [state, dispatch] = useContext(StoreContext)
   const [userInfo, setUserInfo] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])

   async function handleLogout() {
      const result = await logout()
      if (result.code === 'SS') {
         document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
         localStorage.removeItem('userInfo')
         localStorage.removeItem('cartInfo')
         dispatch(setIsLogin(false))
         dispatch(setShowToast(true, 'success', 'Đăng xuất thành công!'))
         navigate('/')
      }
   }

   return (
      <div className={cssUserInfo.wrapper}>
         <h2 className={cssUserInfo.userName}>{userInfo?.name}</h2>
         <img
            className={cssUserInfo.userImg}
            src={userInfo?.image ? `${imageLink}/images/${userInfo?.image}` : defaultAvatar}
         />
         <div className={cssUserInfo.userAction}>
            <ul className={cssUserInfo.menuList}>
               <li className={cssUserInfo.menuItem}>
                  <i className="fa-solid fa-user"></i>Xem thông tin
               </li>
               <li className={cssUserInfo.menuItem} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
               </li>
            </ul>
         </div>
      </div>
   )
}

export default InfoCustomer
