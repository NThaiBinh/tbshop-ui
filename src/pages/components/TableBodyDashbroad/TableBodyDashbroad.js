import cssTabelBodyDashbroad from './TableBodyDashbroad.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'
import { formattedDate } from '../../../utils/formatDate'
import { imageApi } from '../../../services'
function TabelBodyDashbroad({ id, name, image, updateAt, handleEdit, handleDelete }) {
   const dateFormated = formattedDate(updateAt)
   return (
      <tr>
         <td>{id}</td>
         <td>
            <h3>{name}</h3>
         </td>
         {image && (
            <td>
               <img className={cssTabelBodyDashbroad.img} src={`${imageApi}/${image}`} />
            </td>
         )}
         <td>{dateFormated}</td>
         <td className={cssTabelBodyDashbroad.action}>
            <ButtonMedium title="Sửa" type="submit" handleClick={handleEdit} />
            <ButtonMedium title="Xóa" type="delete" handleClick={handleDelete} />
         </td>
      </tr>
   )
}
export default TabelBodyDashbroad
