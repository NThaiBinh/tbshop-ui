import { useEffect, useState } from 'react'
import InputValue from '../../components/InputValue/InputValue'
import styles from './Statistical.module.css'
import { getStatistical } from '../../../services/invoiceServices'
import currencyFormat from '../../../utils/currencyFormat'

function Statistical() {
   const today = new Date()
   const formattedDate = today.toISOString().split('T')[0]
   const [startDate, setStartDate] = useState(formattedDate)
   const [endDate, setEnDate] = useState(formattedDate)
   const [statistical, setStatistical] = useState({})

   useEffect(() => {
      async function handleGetStatistical() {
         const statisticalInfo = await getStatistical(startDate, endDate)
         if (statisticalInfo.code === 'SS') {
            setStatistical(statisticalInfo.data)
         }
      }
      handleGetStatistical()
   }, [startDate, endDate])

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <h1 className={styles.title}>
               THỐNG KÊ DOANH THU TỪ
               <div className={styles.groupInput}>
                  <InputValue type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
               </div>
               ĐẾN
               <div className={styles.groupInput}>
                  <InputValue type="date" value={endDate} onChange={(e) => setEnDate(e.target.value)} />
               </div>
               :
            </h1>
         </div>
         <div className={styles.groupStatictical}>
            <div className={styles.cart}>
               <h2 className={styles.cartHeader}>SỐ SẢN PHẨM ĐÃ BÁN</h2>
               <h1 className={styles.cartBody}>{statistical.totalPrice?.TONGSODABAN}</h1>
            </div>
            <div className={styles.cart}>
               <h2 className={styles.cartHeader}>TỔNG DOANH THU</h2>
               <h1 className={styles.cartBody}>{currencyFormat(statistical.totalPrice?.TONGDOANHTHU || 0)}</h1>
            </div>
         </div>
         <div className={styles.groupStatictical}>
            <div className={styles.cart}>
               <h2 className={styles.cartHeader}>SẢN PHẨM BÁN CHẠY</h2>
               <h1 className={styles.cartBody}>{statistical.bestProduct?.TENSP}</h1>
            </div>
            <div className={styles.cart}>
               <h2 className={styles.cartHeader}>SẢN PHẨM BÁN CHẬM</h2>
               <h1 className={styles.cartBody}>{statistical.lastProduct?.TENSP}</h1>
            </div>
         </div>
      </div>
   )
}

export default Statistical
