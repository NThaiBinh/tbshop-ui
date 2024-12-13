import { useContext, useEffect, useState } from 'react'
import styles from './UserInfo.module.css'
import defaultAvatar from '../images/default_avatar.jpg'
import { getUserInfoById, logout } from '../../../../services/authServices'
import StoreContext from '../../../../store/StoreContext'
import { setIsLogin, setShowToast } from '../../../../store/actions'
import { useNavigate } from 'react-router-dom'
const imageLink = 'http://localhost:3001'

function UserInfo() {
   const [state, dispatch] = useContext(StoreContext)
   const [userInfo, setUserInfo] = useState()
   const [cartInfo, setCartInfo] = useState()
   const navigate = useNavigate()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }

      const storedCartInfo = localStorage.getItem('cartInfo')
      if (storedCartInfo) {
         setCartInfo(JSON.parse(storedCartInfo))
      }
   }, [state.isUserUpdate])

   useEffect(() => {}, [])

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
      <div className={styles.wrapper}>
         <h2 className={styles.userName}>{userInfo?.name}</h2>
         <img
            className={styles.userImg}
            src={
               userInfo?.image
                  ? `${userInfo.image}`.includes('blob:')
                     ? userInfo.image
                     : `${imageLink}/images/${userInfo?.image}`
                  : defaultAvatar
            }
         />
         <div className={styles.userAction}>
            <ul className={styles.menuList}>
               <li className={styles.menuItem} onClick={() => navigate('/profile')}>
                  <i className="fa-solid fa-user"></i>Xem hồ sơ
               </li>
               {cartInfo && (
                  <li className={styles.menuItem} onClick={() => navigate('/orders')}>
                     <i className="fa-solid fa-box-open"></i>Đơn mua
                  </li>
               )}
               <li className={styles.menuItem} onClick={() => navigate('/address')}>
                  <i className="fa-solid fa-location-dot"></i>Thông tin địa chỉ
               </li>
               <li className={styles.menuItem} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>Đăng xuất
               </li>
            </ul>
         </div>
      </div>
   )
}

export default UserInfo
