import ButtonMedium from '../ButtonMedium/ButtonMedium'
import styles from './EditWithoutImage.module.css'
function EditWithoutImage({ children, title, handleSubmit, handleExit }) {
   return (
      <div className={styles.wrapper}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.content}>{children}</div>
         <div className={styles.footer}>
            <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
            <ButtonMedium title="Đồng ý" type="submit" handleClick={handleSubmit} />
         </div>
      </div>
   )
}

export default EditWithoutImage
