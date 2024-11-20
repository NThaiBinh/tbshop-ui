import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import cssEditProductDiscount from './EditProductDiscount.module.css'
import StoreContext from '../../../store/StoreContext'
import EditWithoutImage from '../EditWithoutImage/EditWithoutImage'
import EditWidthPanel from '../EditWidthPanel/EditWidthPanel'
function EditProductDiscount({
   title,
   productId,
   setProductId,
   name,
   setName,
   price,
   setPrice,
   startDate,
   setStartDate,
   endDate,
   setEndDate,
   posterDiscount,
   setPosterDiscount,
   handleSubmit,
}) {
   const navidate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   function handleExit() {
      navidate(state.previousPath)
   }
   return (
      <Modal>
         <EditWidthPanel
            title={title}
            posterDiscount={posterDiscount}
            setPosterDiscount={setPosterDiscount}
            handleSubmit={handleSubmit}
            handleExit={handleExit}
         >
            <div className={cssEditProductDiscount.wrapper}>
               <div className={cssEditProductDiscount.groupInput}>
                  <div className={cssEditProductDiscount.flexInput}>
                     <div className={cssEditProductDiscount.input}>
                        <InputValue
                           id="productId"
                           title="Mã sản phẩm khuyến mãi:"
                           isRequire={true}
                           value={productId}
                           onChange={(e) => setProductId(e.target.value)}
                        />
                     </div>
                     <div className={cssEditProductDiscount.input}>
                        <InputValue
                           id="name"
                           title="Tên khuyến mãi:"
                           isRequire={true}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className={cssEditProductDiscount.input}>
                     <InputValue
                        id="price"
                        title="Giá khuyến mãi:"
                        isRequire={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                     />
                  </div>
               </div>
               <div className={cssEditProductDiscount.groupInput}>
                  <div className={cssEditProductDiscount.input}>
                     <InputValue
                        id="startDate"
                        title="Ngày bắt đầu:"
                        isRequire={true}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="datetime-local"
                     />
                  </div>
                  <div className={cssEditProductDiscount.input}>
                     <InputValue
                        id="endDate"
                        title="Ngày kết thúc:"
                        isRequire={true}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="datetime-local"
                     />
                  </div>
               </div>
            </div>
         </EditWidthPanel>
      </Modal>
   )
}

export default EditProductDiscount
