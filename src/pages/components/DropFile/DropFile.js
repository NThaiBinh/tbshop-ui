import { useEffect, useState } from 'react'
import clsx from 'clsx'
import cssDropFile from './DropFile.module.css'
import { imageApi } from '../../../services'

function DropFile({ id, image, handleDropFile, handleImageChange, isDisabled }) {
   const [preview, setPreview] = useState()
   let fileInput
   useEffect(() => {
      fileInput = document.getElementById(id)
      return () => URL.revokeObjectURL(preview)
   })

   function handleDragOver(e) {
      e.preventDefault()
   }

   return (
      <div className={cssDropFile.wrapper}>
         <div
            className={cssDropFile.dropZone}
            onDrop={(e) => {
               e.preventDefault()
               if (!isDisabled) {
                  const file = e.dataTransfer.files[0]
                  if (file) {
                     setPreview(URL.createObjectURL(file))
                     handleDropFile(id, file)
                  }
               }
            }}
            onDragOver={handleDragOver}
            onClick={() => fileInput.click()}
         >
            <h3>Nhấn hoặc kéo thả</h3>
            <i className={clsx('fa-solid fa-circle-plus', cssDropFile.icon)}></i>
            {(image || preview) && <img className={cssDropFile.img} src={preview || `${imageApi}/${image}`} />}
         </div>
         <input
            id={id}
            className={cssDropFile.fileInput}
            type="file"
            onChange={(e) => {
               const file = e.target.files[0]
               if (file) {
                  setPreview(URL.createObjectURL(file))
                  handleImageChange(id, file)
               }
            }}
            disabled={isDisabled}
         />
      </div>
   )
}

export default DropFile
