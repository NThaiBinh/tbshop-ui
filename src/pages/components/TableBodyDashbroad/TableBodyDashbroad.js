import styles from './TableBodyDashbroad.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import { dateTimeFormat } from '../../../utils/formatDate'
import { imageApi } from '../../../services'
import currencyFormat from '../../../utils/currencyFormat'
function TabelBodyDashbroad({
   id,
   refId,
   manufacName,
   name,
   image,
   positionName,
   updatedAt,
   startDate,
   endDate,
   quantityInStock,
   productPrice,
   handleEdit,
   handleDelete,
}) {
   let updatedAtFormat, startDateFormat, endDateFormat
   if (updatedAt) {
      updatedAtFormat = dateTimeFormat(updatedAt)
   }
   if (startDate) {
      startDateFormat = dateTimeFormat(startDate)
   }
   if (endDate) {
      endDateFormat = dateTimeFormat(endDate)
   }
   return (
      <tr>
         <td>{id}</td>
         {manufacName && <td>{manufacName}</td>}
         {refId && <td>{refId}</td>}
         <td>
            <h3>{name}</h3>
         </td>
         {positionName && <td>{positionName}</td>}
         {image && (
            <td>
               <img className={styles.img} src={`${imageApi}/${image}`} />
            </td>
         )}
         {quantityInStock && <td>{quantityInStock}</td>}
         {productPrice && <td>{currencyFormat(productPrice)}</td>}
         {updatedAt && <td>{updatedAtFormat}</td>}
         {startDate && <td>{startDateFormat}</td>}
         {endDate && <td>{endDateFormat}</td>}
         <td className={styles.action}>
            <ButtonMedium title="Sửa" type="submit" handleClick={handleEdit} />
            <ButtonMedium title="Xóa" type="delete" handleClick={handleDelete} />
         </td>
      </tr>
   )
}
export default TabelBodyDashbroad
