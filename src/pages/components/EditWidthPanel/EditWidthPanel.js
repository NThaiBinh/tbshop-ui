import cssEditWidthPanel from './EditWidthPanel.module.css'
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
      <div className={cssEditWidthPanel.wrapper}>
         <div className={cssEditWidthPanel.header}>
            <div className={cssEditWidthPanel.groupTitle}>
               <h3 className={cssEditWidthPanel.title}>{title}</h3>
            </div>
            <div className={cssEditWidthPanel.groupPanel}>
               <DropFile
                  id="posterDiscount"
                  image={posterDiscount}
                  handleDropFile={handleDropFile}
                  handleImageChange={handleImageChange}
               />
            </div>
         </div>
         <div className={cssEditWidthPanel.body}>{children}</div>
         <div className={cssEditWidthPanel.footer}>
            <div className={cssEditWidthPanel.groupButton}>
               <ButtonMedium title="Đồng ý" type="submit" handleClick={handleSubmit} />
               <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
            </div>
         </div>
      </div>
   )
}

export default EditWidthPanel
