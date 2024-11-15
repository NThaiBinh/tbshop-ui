import { useContext, useState } from 'react'
import clsx from 'clsx'
import cssTableInfoDashbroad from './TableInfoDashbroad.module.css'
import StoreContext from '../../../store/StoreContext'
import { setPage } from '../../../store/actions'

function TableInfoDashbroad({ title, children, image, pagination }) {
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
                  <th className={cssTableInfoDashbroad.name}>Tên</th>
                  {image && <th className={cssTableInfoDashbroad.name}>Ảnh</th>}
                  <th className={cssTableInfoDashbroad.createAt}>Ngày tạo</th>
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
