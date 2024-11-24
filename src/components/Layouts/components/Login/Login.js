import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import cssLogin from './Login.module.css'
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
            localStorage.setItem('cartInfo', JSON.stringify(userInfo.data.cartInfo))
            dispatch(setIsLogin(true))
            dispatch(setShowToast(true, 'success', 'Đăng nhập thành công!'))
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
         <div className={cssLogin.loginForm}>
            {checkForm && (
               <div className={cssLogin.loginInfo}>
                  <h2 className={cssLogin.title}>Đăng nhập</h2>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="userName">
                        Tên đăng nhập
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={loginInfo.userName}
                        onChange={(e) => setLoginInfo({ ...loginInfo, userName: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="password">
                        Mật khẩu
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={loginInfo.password}
                        onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                        type="password"
                        id="password"
                     />
                  </div>

                  <p className={cssLogin.meaasge}>{message}</p>

                  <div className={cssLogin.buttonGroup}>
                     <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
                     <ButtonMedium title="Đăng nhập" type="submit" handleClick={handleLogin} />
                  </div>
                  <p className={cssLogin.switchForm}>
                     Bạn chưa có tài khoản?
                     <strong
                        className={cssLogin.switchFormLink}
                        onClick={() => {
                           setCheckForm(!checkForm)
                           navigate('/register', { replace: true })
                        }}
                     >
                        Đăng ký
                     </strong>
                  </p>
               </div>
            )}
            {!checkForm && (
               <div className={cssLogin.registerInfo}>
                  <h2 className={cssLogin.title}>Đăng ký</h2>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="userName">
                        Họ và tên
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={registerInfo.name}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="userName">
                        Tên đăng nhập
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={registerInfo.userName}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, userName: e.target.value })}
                        type="text"
                        id="userName"
                     />
                  </div>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="password">
                        Mật khẩu
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={registerInfo.password}
                        onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                        type="password"
                        id="password"
                     />
                  </div>

                  <div className={cssLogin.inputGroup}>
                     <label className={cssLogin.labelInput} htmlFor="re-enter-password">
                        Nhập lại mật khẩu
                     </label>
                     <input
                        className={cssLogin.loginInput}
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
                        type="password"
                        id="re-enter-password"
                     />
                  </div>

                  <p className={cssLogin.meaasge}>{message}</p>

                  <div className={cssLogin.buttonGroup}>
                     <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
                     <ButtonMedium title="Đăng ký" type="submit" handleClick={handleRegister} />
                  </div>
                  <p className={cssLogin.switchForm}>
                     Bạn đã có tài khoản?
                     <strong
                        className={cssLogin.switchFormLink}
                        onClick={() => {
                           setCheckForm(!checkForm)
                           navigate('/login', { replace: true })
                        }}
                     >
                        Đăng nhập
                     </strong>
                  </p>
               </div>
            )}
            <div
               className={clsx(cssLogin.wellcome, {
                  [cssLogin.loginContent]: checkForm,
                  [cssLogin.registerContent]: !checkForm,
               })}
            >
               {checkForm && (
                  <div className={cssLogin.wellcomeBack}>
                     <h2 className={cssLogin.wellcomeBackTitle}>Wellcome Back!</h2>
                     <p className={cssLogin.wellcomeBackDescription}>
                        Đăng ký <strong>TBShop</strong> để trải nghiệm mua sắm tuyệt vời!
                     </p>
                  </div>
               )}
               {!checkForm && (
                  <div className={cssLogin.wellcomeTo}>
                     <h2 className={cssLogin.wellcomeToTitle}>Wellcome To TBSHOP!</h2>
                     <p className={cssLogin.wellcomeToDescription}>
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
