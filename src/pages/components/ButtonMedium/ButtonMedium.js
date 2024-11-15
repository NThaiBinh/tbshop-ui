import clsx from 'clsx'
import cssButtonMedium from './ButtonMedium.module.css'

function ButtonMedium({ title, type, handleClick }) {
   return (
      <button
         className={clsx(cssButtonMedium.btnMedium, {
            [cssButtonMedium.btnExit]: type === 'exit',
            [cssButtonMedium.btnSubmit]: type === 'submit',
            [cssButtonMedium.btnDelete]: type === 'delete',
         })}
         onClick={handleClick}
      >
         {title}
      </button>
   )
}
export default ButtonMedium
