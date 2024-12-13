import styles from './EditWidthPanel.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import DropFile from '../DropFile/DropFile'
function EditWidthPanel({
   children,
   title,
   posterDiscount,
   handleDropFile,
   handleImageChange,
   handleSubmit,
   handleExit,
}) {
   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <div className={styles.groupTitle}>
               <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.groupPanel}>
               <DropFile
                  id="posterDiscount"
                  image={posterDiscount}
                  handleDropFile={handleDropFile}
                  handleImageChange={handleImageChange}
               />
            </div>
         </div>
         <div className={styles.body}>{children}</div>
         <div className={styles.footer}>
            <div className={styles.groupButton}>
               <ButtonMedium title="Đồng ý" type="submit" handleClick={handleSubmit} />
               <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
            </div>
         </div>
      </div>
   )
}

export default EditWidthPanel
