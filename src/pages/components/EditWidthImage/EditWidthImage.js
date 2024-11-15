import { useEffect } from 'react'
import clsx from 'clsx'
import cssEditWithImage from './EditWidthImage.module.css'
import defaultAvatar from '../../../components/Layouts/components/images/default_avatar.jpg'
import { imageApi } from '../../../services'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
function EditWidthImage({ children, title, image, imageChange, handleSubmit, handleExit }) {
   useEffect(() => {
      return () => {
         image && URL.revokeObjectURL(image)
      }
   }, [image])

   return (
      <div className={cssEditWithImage.wrapper}>
         <h2 className={cssEditWithImage.title}>{title}</h2>
         <div className={cssEditWithImage.container}>
            <div className={cssEditWithImage.groupImage}>
               <img
                  className={cssEditWithImage.img}
                  src={
                     image
                        ? typeof image === 'object'
                           ? URL.createObjectURL(image)
                           : `${imageApi}/${image}`
                        : defaultAvatar
                  }
                  alt="Logo"
               />
               <label htmlFor={cssEditWithImage.fileInput} className={cssEditWithImage.customFileInput}>
                  Chọn ảnh
                  <i className={clsx('fa-solid fa-cloud-arrow-up', cssEditWithImage.iconUpload)}></i>
               </label>
               <input type="file" id={cssEditWithImage.fileInput} onChange={imageChange} />
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
