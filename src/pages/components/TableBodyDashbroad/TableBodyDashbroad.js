import cssTabelBodyDashbroad from './TableBodyDashbroad.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import { dateTimeFormat } from '../../../utils/formatDate'
import { imageApi } from '../../../services'
function TabelBodyDashbroad({ id, refId, name, image, updatedAt, startDate, endDate, handleEdit, handleDelete }) {
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
         {refId && <td>{refId}</td>}
         <td>
            <h3>{name}</h3>
         </td>
         {image && (
            <td>
               <img className={cssTabelBodyDashbroad.img} src={`${imageApi}/${image}`} />
            </td>
         )}
         {updatedAt && <td>{updatedAtFormat}</td>}
         {startDate && <td>{startDateFormat}</td>}
         {endDate && <td>{endDateFormat}</td>}
         <td className={cssTabelBodyDashbroad.action}>
            <ButtonMedium title="Sửa" type="submit" handleClick={handleEdit} />
            <ButtonMedium title="Xóa" type="delete" handleClick={handleDelete} />
         </td>
      </tr>
   )
}
export default TabelBodyDashbroad
