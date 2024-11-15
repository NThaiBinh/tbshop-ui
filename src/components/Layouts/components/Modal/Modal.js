import cssModal from './Modal.module.css'

function Modal({ children }) {
   return (
      <div className={cssModal.modal}>
         <div className={cssModal.content}>{children}</div>
      </div>
   )
}

export default Modal
