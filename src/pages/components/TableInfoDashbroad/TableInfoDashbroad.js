import { useContext } from 'react'
import clsx from 'clsx'
import cssTableInfoDashbroad from './TableInfoDashbroad.module.css'
import StoreContext from '../../../store/StoreContext'
import { setPage } from '../../../store/actions'

function TableInfoDashbroad({ title, children, image, pagination, updatedAt, startDate, enddate, refId }) {
   const [state, dispatch] = useContext(StoreContext)
   function handleInput(e) {
      if (/^\d+$/.test(e.target.value)) dispatch(setPage(e.target.value))
   }
   return (
      <div className={cssTableInfoDashbroad.wrapper}>
         <table>
            <caption>
               <h2>{title}</h2>
            </caption>
            <thead>
               <tr>
                  <th className={cssTableInfoDashbroad.id}>Mã</th>
                  {refId && <th className={cssTableInfoDashbroad.id}>Mã sản phẩm</th>}
                  <th className={cssTableInfoDashbroad.name}>Tên</th>
                  {image && <th className={cssTableInfoDashbroad.name}>Ảnh</th>}
                  {updatedAt && <th className={cssTableInfoDashbroad.date}>Ngày cập nhật</th>}
                  {startDate && <th className={cssTableInfoDashbroad.date}>Ngày bắt đầu</th>}
                  {enddate && <th className={cssTableInfoDashbroad.date}>Ngày kết thúc</th>}
                  <th className={cssTableInfoDashbroad.action}>Hành động</th>
               </tr>
            </thead>
            <tbody>{children}</tbody>
         </table>
         {pagination && (
            <div className={cssTableInfoDashbroad.selectPage}>
               <button className={clsx(cssTableInfoDashbroad.btn, cssTableInfoDashbroad.btnPrev)}>Trang trước</button>
               <input className={cssTableInfoDashbroad.inputPage} value={state.page} onChange={handleInput} />
               <button className={clsx(cssTableInfoDashbroad.btn, cssTableInfoDashbroad.btnNext)}>Trang sau</button>
            </div>
         )}
      </div>
   )
}

export default TableInfoDashbroad
