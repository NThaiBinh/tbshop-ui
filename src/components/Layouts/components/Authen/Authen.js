import { useNavigate } from 'react-router-dom'
import styles from './Authen.module.css'
import ButtonMedium from '../../../../pages/components/ButtonMedium/ButtonMedium'

function Authen() {
   const navigate = useNavigate()

   function handleRegister() {
      navigate('/register')
   }

   function handleLogin() {
      navigate('/login')
   }

   return (
      <div className={styles.authen}>
         <ButtonMedium title="Đăng ký" type="submit" handleClick={handleRegister} />
         <ButtonMedium title="Đăng nhập" handleClick={handleLogin} />
      </div>
   )
}

export default Authen
