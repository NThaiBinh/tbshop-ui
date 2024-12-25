import styles from './Printable.module.css'
import Modal from '../../../components/Layouts/components/Modal/Modal'

function Printable({ children }) {
   function handlePrint() {
      window.print() // Mở hộp thoại in
   }

   return (
      <Modal>
         <div className={styles.wrapper}>
            <div className={styles.printArea}>{children}</div>
            <button onClick={handlePrint} className={styles.btnPrint}>
               In
            </button>
         </div>
      </Modal>
   )
}

export default Printable
