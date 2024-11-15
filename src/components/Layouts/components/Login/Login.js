import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import cssLogin from './Login.module.css'
import { login } from '../../../../services/customerServices'
import StoreContext from '../../../../store/StoreContext'
import Modal from '../Modal/Modal'
import ButtonMedium from '../../../../pages/components/ButtonMedium/ButtonMedium'

function Login() {
   const [state, dispatch] = useContext(StoreContext)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [message, setMessage] = useState('')
   const navigate = useNavigate()
   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

   useEffect(() => {
      if (Cookies.get('customerId')) {
         navigate('/')
      }
   }, [])

   function handleExit() {
      navigate(state.previousPath)
   }

   async function handleSubmit() {
      if (!email || !password) {
         setMessage('Vui lòng điền đầy đủ thông tin!')
      } else if (!email.match(emailRegex)) {
         setMessage('Email không hợp lệ!')
      } else {
         const info = await login(email, password)
         if (info.message) {
            setMessage('Sai tài khoản hoặc mật khẩu!')
         } else {
            const date = new Date()
            date.setTime(Date.now() + 1 * 24 * 60 * 60 * 1000)
            document.cookie = `customerId=${info.customerId}; expires=${date.toUTCString()}`
            navigate(state.previousPath)
         }
      }
   }
   return (
      <Modal>
         <div className={cssLogin.loginForm}>
            <div className={cssLogin.loginInfo}>
               <h2 className={cssLogin.title}>Đăng nhập</h2>

               <div className={cssLogin.inputGroup}>
                  <label className={cssLogin.labelInput} htmlFor="email">
                     Email
                  </label>
                  <input
                     className={cssLogin.loginInput}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="text"
                     name="email"
                  />
               </div>

               <div className={cssLogin.inputGroup}>
                  <label className={cssLogin.labelInput} htmlFor="password">
                     Mật khẩu
                  </label>
                  <input
                     className={cssLogin.loginInput}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     name="password"
                  />
               </div>

               <p className={cssLogin.meaasge}>{message}</p>

               <div className={cssLogin.buttonGroup}>
                  <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
                  <ButtonMedium title="Đăng nhập" type="submit" handleClick={handleSubmit} />
               </div>
               <p className={cssLogin.switchForm}>
                  Bạn chưa có tài khoản?
                  <a className={cssLogin.switchFormLink} href="/users/login">
                     Đăng ký
                  </a>
               </p>
            </div>

            <div className={cssLogin.wellcome}>
               <div className={cssLogin.wellcomeContent}>
                  <h2 className={cssLogin.contentTitle}>Wellcome Back!</h2>
                  <p className={cssLogin.contentDescription}>
                     Đăng nhập <strong>TBShop</strong> để trải nghiệm những điều tuyệt vời!
                  </p>
               </div>
            </div>
         </div>
      </Modal>
   )
}

export default Login
