import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import EditWithoutImage from '../EditWithoutImage/EditWithoutImage'
import InputValue from '../InputValue/InputValue'
import cssEditPosition from './EditPosition.module.css'
function EditPosition({ title, handleSubmit, name, setName, nameMessage }) {
   const navigate = useNavigate()
   function handleExit() {
      navigate(-1)
   }
   return (
      <Modal>
         <EditWithoutImage title={title} handleSubmit={handleSubmit} handleExit={handleExit}>
            <div className={cssEditPosition.wrapper}>
               <InputValue
                  id="name"
                  title="Tên chức vụ:"
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

export default EditPosition
