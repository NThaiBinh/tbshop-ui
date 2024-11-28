import cssEditWithImage from './EditWidthImage.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import DropFile from '../DropFile/DropFile'

function EditWidthImage({ children, title, image, handleDropFile, handleImageChange, handleSubmit, handleExit }) {
   return (
      <div className={cssEditWithImage.wrapper}>
         <h2 className={cssEditWithImage.title}>{title}</h2>
         <div className={cssEditWithImage.container}>
            <div className={cssEditWithImage.groupImage}>
               <DropFile id="img" image={image} handleDropFile={handleDropFile} handleImageChange={handleImageChange} />
            </div>
            <div className={cssEditWithImage.groupInputValue}>{children}</div>
         </div>
         <div className={cssEditWithImage.footer}>
            <ButtonMedium title="Thoát" handleClick={handleExit} type="exit" />
            <ButtonMedium title="Đồng ý" handleClick={handleSubmit} type="submit" />
         </div>
      </div>
   )
}

export default EditWidthImage
