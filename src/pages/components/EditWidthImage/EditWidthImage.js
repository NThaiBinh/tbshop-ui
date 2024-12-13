import styles from './EditWidthImage.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import DropFile from '../DropFile/DropFile'

function EditWidthImage({ children, title, image, handleDropFile, handleImageChange, handleSubmit, handleExit }) {
   return (
      <div className={styles.wrapper}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.container}>
            <div className={styles.groupImage}>
               <DropFile id="img" image={image} handleDropFile={handleDropFile} handleImageChange={handleImageChange} />
            </div>
            <div className={styles.groupInputValue}>{children}</div>
         </div>
         <div className={styles.footer}>
            <ButtonMedium title="Thoát" handleClick={handleExit} type="exit" />
            <ButtonMedium title="Đồng ý" handleClick={handleSubmit} type="submit" />
         </div>
      </div>
   )
}

export default EditWidthImage
