import clsx from 'clsx'
import styles from './ButtonMedium.module.css'

function ButtonMedium({ title, type, handleClick }) {
   return (
      <button
         className={clsx(styles.btnMedium, {
            [styles.btnExit]: type === 'exit',
            [styles.btnSubmit]: type === 'submit',
            [styles.btnDelete]: type === 'delete',
         })}
         onClick={handleClick}
      >
         {title}
      </button>
   )
}
export default ButtonMedium
