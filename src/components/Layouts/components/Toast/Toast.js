import { useEffect, useContext } from 'react'
import clsx from 'clsx'
import cssToast from './Toast.module.css'
import StoreContext from '../../../../store/StoreContext'
import { setShowToast } from '../../../../store/actions'
import shiVoTay from '../images/shi-votay.gif'
import ngao from '../images/ngao.jpg'

function Toast(props) {
   const [state, dispatch] = useContext(StoreContext)
   const iconState = {
      success: 'fa-solid fa-circle-check',
      error: 'fa-solid fa-circle-xmark',
   }

   useEffect(() => {
      const timerId = setTimeout(() => {
         dispatch(setShowToast(false, '', ''))
      }, 3000)
      return () => {
         clearTimeout(timerId)
      }
   }, [])

   return (
      <div className={cssToast.wrapper}>
         <div className={cssToast.imgToast}>
            <img className={cssToast.img} src={(props.type === 'success' && shiVoTay) || ngao} />
         </div>
         <div
            className={clsx(
               cssToast.lineState,
               { [cssToast.success]: props.type === 'success' },
               { [cssToast.error]: props.type === 'error' },
            )}
         ></div>
         <div className={cssToast.iconState}>
            <i
               className={clsx(
                  iconState[props.type],
                  { [cssToast.iconSuccess]: props.type === 'success' },
                  { [cssToast.iconError]: props.type === 'error' },
               )}
            ></i>
         </div>
         <h2 className={cssToast.message}>{props.message}</h2>
         <div className={cssToast.clear}>x</div>
      </div>
   )
}

export default Toast
