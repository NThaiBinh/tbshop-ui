import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import styles from './Login.module.css'
import { login, register } from '../../../../services/authServices'
import Modal from '../Modal/Modal'
import ButtonMedium from '../../../../pages/components/ButtonMedium/ButtonMedium'
import StoreContext from '../../../../store/StoreContext'
import clsx from 'clsx'
import { setIsLogin, setShowToast } from '../../../../store/actions'

function Login() {
   const location = useLocation()
   const [checkForm, setCheckForm] = useState(true)
   const [loginInfo, setLoginInfo] = useState({ userName: '', password: '' })

   const [registerInfo, setRegisterInfo] = useState({
      name: '',
      userName: '',
      password: '',
   })
   const [reEnterPassword, setReEnterPassword] = useState('')
   const [message, setMessage] = useState('')
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   useEffect(() => {
      setCheckForm(location.pathname === '/login')
      if (Cookies.get('customerId')) {
         navigate(-1)
      }
   }, [])

   function handleExit() {
      navigate(-1)
   }

   async function handleLogin() {
      if (loginInfo.userName === '' || loginInfo.password === '') {
         setMessage('Vui lòng điền đầy đủ thông tin!')
      } else {
         const userInfo = await login(loginInfo)
         if (userInfo.code === 'SS') {
            localStorage.setItem('userInfo', JSON.stringify(userInfo.data.info))
            if (userInfo.data.info.userType === 'customer') {
               localStorage.setItem('cartInfo', JSON.stringify(userInfo.data.cartInfo))
            }
            dispatch(setIsLogin(true))
            dispatch(setShowToast(true, 'success', `Xin chào ${userInfo.data.info.name}!`))
            navigate(-1)
         } else {
            setMessage('Sai tài khoản hoặc mật khẩu!')
         }
      }
   }

   async function handleRegister() {
      const result = await register({ ...registerInfo, accountType: 'customer' })

      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Đăng ký thành công!'))
         setCheckForm(!checkForm)
         navigate('/login', { replace: true })
      }
   }
   return (
      <Modal>
         <div className={styles.loginForm}>
            {checkForm && (
               <div className={styles.loginInfo}>
                  <h2 className={styles.title}>Đăng nhập</h2>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="userName">
                        Tên đăng nhập
                     </label>
                     <input
                        className={styles.loginInput}
                        value={loginInfo.userName}
                        onChange={(e) => setLoginInfo({ ...loginInfo, userName: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="password">
                        Mật khẩu
                     </label>
                     <input
                        className={styles.loginInput}
                        value={loginInfo.password}
                        onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                        type="password"
                        id="password"
                     />
                  </div>

                  <p className={styles.meaasge}>{message}</p>

                  <div className={styles.buttonGroup}>
                     <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
                     <ButtonMedium title="Đăng nhập" type="submit" handleClick={handleLogin} />
                  </div>
                  <div className={styles.switchForm}>
                     <p>
                        Bạn chưa có tài khoản?
                        <strong
                           className={styles.switchFormLink}
                           onClick={() => {
                              setCheckForm(!checkForm)
                              navigate('/register', { replace: true })
                           }}
                        >
                           Đăng ký
                        </strong>
                     </p>
                     <strong className={styles.switchFormLink} onClick={() => navigate('/user/forgot-password')}>
                        Quên mật khẩu?
                     </strong>
                  </div>
               </div>
            )}
            {!checkForm && (
               <div className={styles.registerInfo}>
                  <h2 className={styles.title}>Đăng ký</h2>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="userName">
                        Họ và tên
                     </label>
                     <input
                        className={styles.loginInput}
                        value={registerInfo.name}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="userName">
                        Tên đăng nhập
                     </label>
                     <input
                        className={styles.loginInput}
                        value={registerInfo.userName}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, userName: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="password">
                        Mật khẩu
                     </label>
                     <input
                        className={styles.loginInput}
                        value={registerInfo.password}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                        type="password"
                        id="password"
                     />
                  </div>

                  <div className={styles.inputGroup}>
                     <label className={styles.labelInput} htmlFor="re-enter-password">
                        Nhập lại mật khẩu
                     </label>
                     <input
                        className={styles.loginInput}
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
                        type="password"
                        id="re-enter-password"
                     />
                  </div>

                  <p className={styles.meaasge}>{message}</p>

                  <div className={styles.buttonGroup}>
                     <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
                     <ButtonMedium title="Đăng ký" type="submit" handleClick={handleRegister} />
                  </div>
                  <div className={styles.switchForm}>
                     <p>
                        Bạn đã có tài khoản?
                        <strong
                           className={styles.switchFormLink}
                           onClick={() => {
                              setCheckForm(!checkForm)
                              navigate('/login', { replace: true })
                           }}
                        >
                           Đăng nhập
                        </strong>
                     </p>
                  </div>
               </div>
            )}
            <div
               className={clsx(styles.wellcome, {
                  [styles.loginContent]: checkForm,
                  [styles.registerContent]: !checkForm,
               })}
            >
               {checkForm && (
                  <div className={styles.wellcomeBack}>
                     <h2 className={styles.wellcomeBackTitle}>Wellcome Back!</h2>
                     <p className={styles.wellcomeBackDescription}>
                        Đăng ký <strong>TBShop</strong> để trải nghiệm mua sắm tuyệt vời!
                     </p>
                  </div>
               )}
               {!checkForm && (
                  <div className={styles.wellcomeTo}>
                     <h2 className={styles.wellcomeToTitle}>Wellcome To TBSHOP!</h2>
                     <p className={styles.wellcomeToDescription}>
                        Đăng nhập <strong>TBShop</strong> để trải nghiệm những điều tuyệt vời!
                     </p>
                  </div>
               )}
            </div>
         </div>
      </Modal>
   )
}

export default Login
