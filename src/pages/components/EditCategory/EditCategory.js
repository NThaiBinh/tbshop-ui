import { useState } from 'react'
import cssEditCategory from './EditCategory.module.css'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import EditWithoutImage from '../EditWithoutImage/EditWithoutImage'

function EditCategory({ title, titleName, name, setName, nameMessage, handleSubmit, handleExit }) {
   return (
      <Modal>
         <EditWithoutImage title={title} handleSubmit={handleSubmit} handleExit={handleExit}>
            <div className={cssEditCategory.wrapper}>
               <InputValue
                  id="name"
                  title={titleName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequire={true}
                  message={nameMessage}
               />
            </div>
         </EditWithoutImage>
      </Modal>
   )
}

export default EditCategory
