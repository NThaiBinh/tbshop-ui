import { useContext } from 'react'
import clsx from 'clsx'
import styles from './TableInfoDashbroad.module.css'
import StoreContext from '../../../store/StoreContext'
import { setPage } from '../../../store/actions'

function TableInfoDashbroad({
   title,
   children,
   image,
   pagination,
   quantityInStock,
   productPrice,
   updatedAt,
   startDate,
   enddate,
   refId,
   manufacName,
   positionName,
   print,
   handlePrint,
}) {
   const [state, dispatch] = useContext(StoreContext)
   function handleInput(e) {
      if (/^\d+$/.test(e.target.value)) dispatch(setPage(e.target.value))
   }
   return (
      <div className={styles.wrapper}>
         <table className={styles.tableInfo}>
            <caption>
               <h2>
                  {title}
                  {print && (
                     <button className={styles.btnPrint} onClick={handlePrint}>
                        <i className="fa-solid fa-file-export"></i>
                        In danh sách
                     </button>
                  )}
               </h2>
            </caption>
            <thead>
               <tr>
                  <th className={styles.id}>Mã</th>
                  {manufacName && <th className={styles.refName}>Tên nhà sản xuất</th>}
                  {refId && <th className={styles.refName}>Tên sản phẩm</th>}
                  <th className={styles.name}>Tên</th>
                  {positionName && <th className={styles.name}>Chức vụ</th>}
                  {image && <th className={styles.image}>Ảnh</th>}
                  {quantityInStock && <th className={styles.quantityInStock}>SL Tồn</th>}
                  {productPrice && <th className={styles.quantityInStock}>Giá</th>}
                  {updatedAt && <th className={styles.date}>Ngày cập nhật</th>}
                  {startDate && <th className={styles.date}>Ngày bắt đầu</th>}
                  {enddate && <th className={styles.date}>Ngày kết thúc</th>}
                  <th className={styles.action}>Hành động</th>
               </tr>
            </thead>
            <tbody>{children}</tbody>
         </table>
         {pagination && (
            <div className={styles.selectPage}>
               <button
                  className={clsx(styles.btn, styles.btnPrev)}
                  onClick={() => dispatch(setPage(parseInt(state.page) - 1))}
               >
                  Trang trước
               </button>
               <input className={styles.inputPage} value={state.page} onChange={handleInput} />
               <button
                  className={clsx(styles.btn, styles.btnNext)}
                  onClick={() => dispatch(setPage(parseInt(state.page) + 1))}
               >
                  Trang sau
               </button>
            </div>
         )}
      </div>
   )
}

export default TableInfoDashbroad
