import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import cssPrintable from './Printable.module.css'
import { printInvoice } from '../../../services/invoiceServices'
import { dateFormat } from '../../../utils/formatDate'
import currencyFormat from '../../../utils/currencyFormat'
import { getStoreInfo } from '../../../services/storeServices'

const Printable = () => {
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

   const handlePrint = () => {
      window.print() // Mở hộp thoại in
   }

   return (
      <Modal>
         <div className={cssPrintable.wrapper}>
            <div id="printableArea">
               <div className={cssPrintable.header}>
                  <div className={cssPrintable.shopInfo}>
                     <div className={cssPrintable.infoLeft}>
                        <h4>Mã hóa đơn: {` ` + invoice.invoiceId}</h4>
                     </div>
                     <div className={cssPrintable.infoRight}>
                        <h4>TBSHOP</h4>
                        <p className={cssPrintable.address}>{storeInfo.address}</p>
                     </div>
                  </div>
                  <div className={cssPrintable.invoiceInfo}>
                     <h1 className={cssPrintable.title}>HÓA ĐƠN MUA HÀNG</h1>
                     <div className={cssPrintable.customerInfo}>
                        <div className={cssPrintable.groupInfo}>
                           <p>Tên khách hàng:</p>
                           <h4>{invoice.customerName}</h4>
                        </div>
                        <div className={cssPrintable.groupInfo}>
                           <p>Số điện thoại khách hàng:</p>
                           <h4>{invoice.phoneNumber}</h4>
                        </div>
                        <div className={cssPrintable.groupInfo}>
                           <p>Địa chỉ khách hàng:</p>
                           <h4>{invoice.address}</h4>
                        </div>
                        <div className={cssPrintable.groupInfo}>
                           <p>Người lập:</p>
                           <h4>{invoice.employeeName}</h4>
                        </div>
                        <div className={cssPrintable.groupInfo}>
                           <p>Ngày lập:</p>
                           <h4>{dateFormat(invoice.createdAt)}</h4>
                        </div>
                        <div className={cssPrintable.groupInfo}>
                           <p>Trạng thái hóa đơn:</p>
                           <h4>{invoice.status === 'delivering' ? 'Đang giao' : 'Đã giao'}</h4>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={cssPrintable.body}>
                  <table>
                     <thead>
                        <tr>
                           <th>STT</th>
                           <th>Tên sản phẩm</th>
                           <th>Giá</th>
                           <th>Số lượng</th>
                           <th>Tổng tiền</th>
                        </tr>
                     </thead>

                     <tbody>
                        {invoice.productList?.map((item, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.productName}</td>
                              <td>{currencyFormat(item.price)}</td>
                              <td>{item.quantity}</td>
                              <td>{currencyFormat(item.totalPrice)}</td>
                           </tr>
                        ))}
                     </tbody>

                     <tfoot>
                        <tr>
                           <td colSpan="5">Tổng cộng: {` ` + currencyFormat(invoice.totalPrice)}</td>
                        </tr>
                     </tfoot>
                  </table>
               </div>
               <div className={clsx('noPrint', cssPrintable.footer)}>TBSHOP xin cảm ơn!</div>
               <button id="notToPrint" onClick={handlePrint} className={cssPrintable.btnPrint}>
                  In
               </button>
            </div>
         </div>
      </Modal>
   )
}

export default Printable
