import { useEffect, useState } from 'react'
import Printable from '../Printable/Printable'
import styles from './PrintInvoice.module.css'
import { useParams } from 'react-router-dom'
import { getStoreInfo } from '../../../services/storeServices'
import { printInvoice } from '../../../services/invoiceServices'
import { dateFormat } from '../../../utils/formatDate'
import currencyFormat from '../../../utils/currencyFormat'
import { imageApi } from '../../../services'

function PrintInvoice() {
   const [invoice, setInvoice] = useState({})
   const { invoiceId } = useParams()
   const [storeInfo, setStoreInfo] = useState({})

   useEffect(() => {
      async function handleGetStoreInfo() {
         const store = await getStoreInfo()
         if (store.code === 'SS') {
            setStoreInfo(store.data)
         }
      }
      handleGetStoreInfo()
   }, [])

   useEffect(() => {
      async function handleGetInvoiceInfo(invoiceId) {
         const invoiceInfo = await printInvoice(invoiceId)
         if (invoiceInfo.code === 'SS') {
            setInvoice(invoiceInfo.data)
         }
      }

      handleGetInvoiceInfo(invoiceId)
   }, [invoiceId])

   return (
      <Printable>
         <div className={styles.wrapper}>
            <div className={styles.header}>
               <div className={styles.nameAndLogo}>
                  <img src={`${imageApi}/${storeInfo.image}`} className={styles.logo} />
                  <h2>{storeInfo.name}</h2>
               </div>
               <p>{storeInfo.address}</p>
               <h1 className={styles.title}>HÓA ĐƠN BÁN LẺ</h1>
               <div className={styles.customerInfo}>
                  <div className={styles.groupInfo}>
                     <h4>Số HD:</h4>
                     <p>{invoice.invoiceId}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>Khách hàng:</h4>
                     <p>{invoice.customerName}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>SDT:</h4>
                     <p>{invoice.phoneNumber}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>Đ/c nhận hàng:</h4>
                     <p>{invoice.address}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>Người lập:</h4>
                     <p>{invoice.employeeName}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>Ngày mua:</h4>
                     <p>{dateFormat(invoice.createdAt)}</p>
                  </div>
                  <div className={styles.groupInfo}>
                     <h4>Trạng thái:</h4>
                     <p>{invoice.status === 'delivering' ? 'Đang giao' : 'Đã giao'}</p>
                  </div>
               </div>
            </div>

            <div className={styles.body}>
               {invoice.discountList?.length > 0 && (
                  <table className={styles.tableDiscount}>
                     <caption>
                        <strong>CÁC KHUYẾN MÃI ĐÃ ÁP DỤNG</strong>
                     </caption>
                     <thead>
                        <tr>
                           <th>STT</th>
                           <th>Tên KM</th>
                           <th>Giá KM</th>
                           <th>Áp dụng cho</th>
                        </tr>
                     </thead>
                     <tbody>
                        {invoice.discountList?.map((discount, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{discount.discountName}</td>
                              <td>{discount.discountPrice}</td>
                              <td>{discount.applyTo}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
               {/* ================================================== */}
               <table className={styles.tableProduct}>
                  <caption>
                     <strong>DANH SÁCH SẢN PHẨM</strong>
                  </caption>
                  <thead>
                     <tr>
                        <th>STT</th>
                        <th>Tên SP</th>
                        <th>SL</th>
                        <th>DG</th>
                        <th>Tổng</th>
                     </tr>
                  </thead>
                  <tbody>
                     {invoice.productList?.map((product, index) => (
                        <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{product.productName}</td>
                           <td>{product.quantity}</td>
                           <td>{currencyFormat(product.price)}</td>
                           <td>{currencyFormat(product.totalPrice)}</td>
                        </tr>
                     ))}
                  </tbody>
                  <tfoot>
                     <tr>
                        <td colSpan="5">{`Tổng cộng: ${currencyFormat(invoice.totalPrice)}`}</td>
                     </tr>
                  </tfoot>
               </table>
            </div>
            <div className={styles.footer}>TBSHOP xin cảm ơn!</div>
         </div>
      </Printable>
   )
}

export default PrintInvoice
