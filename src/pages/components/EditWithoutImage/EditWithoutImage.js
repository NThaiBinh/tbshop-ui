import ButtonMedium from '../ButtonMedium/ButtonMedium'
import cssEditWithoutImage from './EditWithoutImage.module.css'
function EditWithoutImage({ children, title, handleSubmit, handleExit }) {
   return (
      <div className={cssEditWithoutImage.wrapper}>
         <h2 className={cssEditWithoutImage.title}>{title}</h2>
         <div className={cssEditWithoutImage.content}>{children}</div>
         <div className={cssEditWithoutImage.footer}>
            <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
            <ButtonMedium title="Đồng ý" type="submit" handleClick={handleSubmit} />
         </div>
      </div>
   )
}

export default EditWithoutImage
