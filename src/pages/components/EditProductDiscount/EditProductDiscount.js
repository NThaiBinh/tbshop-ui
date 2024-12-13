import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import InputValue from '../InputValue/InputValue'
import styles from './EditProductDiscount.module.css'
import StoreContext from '../../../store/StoreContext'
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
            <div className={styles.wrapper}>
               <div className={styles.groupInput}>
                  <div className={styles.flexInput}>
                     <div className={styles.input}>
                        <InputValue
                           id="productId"
                           title="Mã sản phẩm khuyến mãi:"
                           isRequire={true}
                           value={productId}
                           onChange={(e) => setProductId(e.target.value)}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="name"
                           title="Tên khuyến mãi:"
                           isRequire={true}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className={styles.input}>
                     <InputValue
                        id="price"
                        title="Giá khuyến mãi:"
                        isRequire={true}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </div>
               </div>
               <div className={styles.groupInput}>
                  <div className={styles.input}>
                     <InputValue
                        id="startDate"
                        title="Ngày bắt đầu:"
                        isRequire={true}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        type="datetime-local"
                     />
                  </div>
                  <div className={styles.input}>
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
