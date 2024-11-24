import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import cssEditStorewideDiscount from './EditStorewideDiscount.module.css'
import StoreContext from '../../../store/StoreContext'
import EditWithoutImage from '../EditWithoutImage/EditWithoutImage'
import EditWidthPanel from '../EditWidthPanel/EditWidthPanel'
function EditStorewideDiscount({
   title,
   name,
   setName,
   price,
   setPrice,
   startDate,
   setStartDate,
   endDate,
   setEndDate,
   posterDiscount,
   handleDropFile,
   handleImageChange,
   handleSubmit,
}) {
   const navidate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)

   function handleExit() {
      navidate(-1)
   }

   return (
      <Modal>
         <EditWidthPanel
            title={title}
            posterDiscount={posterDiscount}
            handleDropFile={handleDropFile}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
         >
            <div className={cssEditStorewideDiscount.wrapper}>
               <div className={cssEditStorewideDiscount.groupInput}>
                  <div className={cssEditStorewideDiscount.input}>
                     <InputValue
                        id="name"
                        title="Tên khuyến mãi:"
                        isRequire={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className={cssEditStorewideDiscount.input}>
                     <InputValue
                        id="price"
                        title="Giá khuyến mãi:"
                        isRequire={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </div>
               </div>
               <div className={cssEditStorewideDiscount.groupInput}>
                  <div className={cssEditStorewideDiscount.input}>
                     <InputValue
                        id="startDate"
                        title="Ngày bắt đầu:"
                        isRequire={true}
                        value={startDate}
                        type="datetime-local"
                        onChange={(e) => setStartDate(e.target.value)}
                     />
                  </div>
                  <div className={cssEditStorewideDiscount.input}>
                     <InputValue
                        id="endDate"
                        title="Ngày kết thúc:"
                        isRequire={true}
                        value={endDate}
                        type="datetime-local"
                        onChange={(e) => setEndDate(e.target.value)}
                     />
                  </div>
               </div>
            </div>
         </EditWidthPanel>
      </Modal>
   )
}

export default EditStorewideDiscount
