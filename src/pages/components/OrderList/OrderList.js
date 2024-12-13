import clsx from 'clsx'
import { imageApi } from '../../../services'
import currencyFormat from '../../../utils/currencyFormat'
import { Link } from 'react-router-dom'
import ButtonMedium from '../../components/ButtonMedium/ButtonMedium'
import styles from './OrderList.module.css'

function OrderList({ orders = [], handleConfirm, titleBtnAction }) {
   return (
      <div className={styles.wrapper}>
         <div className={styles.titleForm}>
            <div className={clsx(styles.wrapperItem, styles.wrapperItemMain)}>
               <strong>Sản phẩm</strong>
            </div>
            <div className={styles.wrapperItem}>
               <strong>Màu sắc</strong>
            </div>
            <div className={styles.wrapperItem}>
               <strong>Đơn giá</strong>
            </div>
            <div className={styles.wrapperItem}>
               <strong>Số lượng</strong>
            </div>
            <div className={styles.wrapperItem}>
               <strong>Số lượng tồn</strong>
            </div>
            <div className={styles.wrapperItem}>
               <strong>Thành tiền</strong>
            </div>
         </div>
         {orders.map((order, index) => {
            let totalOrderProduct = 0
            let totalOrderPrice = 0
            return (
               <div key={index} className={styles.orderWrapper}>
                  <div className={styles.customerInfo}>
                     <strong className={styles.customerId}>{order.customerId}</strong>
                     <strong className={styles.name}>{order.name}</strong>
                     <strong className={styles.address}>{order.address}</strong>
                     <div className={styles.wrapBtnConfirm}>
                        <ButtonMedium title={titleBtnAction} type="delete" handleClick={() => handleConfirm(index)} />
                     </div>
                  </div>
                  {order.orderList.map((orderItem, index) => {
                     totalOrderPrice += orderItem.totalPrice
                     totalOrderProduct += orderItem.quantity
                     order.totalOrderProduct = totalOrderProduct
                     order.totalOrderPrice = totalOrderPrice
                     return (
                        <div key={index} className={styles.orderItem}>
                           <div className={clsx(styles.wrapperItem, styles.wrapperItemMain, styles.groupProduct)}>
                              <img
                                 className={styles.productImage}
                                 src={`${imageApi}/${orderItem.image}`}
                                 alt="Ảnh sản phẩm"
                              />
                              <h3 className={styles.productName}>
                                 <Link
                                    to={`/product/detail?productId=${orderItem.productId}&productConfigurationId=${orderItem.productConfigurationId}`}
                                 >
                                    {orderItem.name}
                                 </Link>
                              </h3>
                              <strong
                                 className={styles.productType}
                              >{`${orderItem.storageCapacity} ${orderItem.cpu} ${orderItem.gpu}`}</strong>
                           </div>
                           <div className={styles.wrapperItem}>
                              <strong>{orderItem.color}</strong>
                           </div>
                           <div className={clsx(styles.wrapperItem, styles.productPrice)}>
                              <strong>{currencyFormat(orderItem.price)}</strong>
                           </div>
                           <div className={styles.wrapperItem}>{orderItem.quantity}</div>
                           <div className={styles.wrapperItem}>{orderItem.stockQuantity}</div>
                           <div className={clsx(styles.wrapperItem, styles.productPrice)}>
                              <strong>{currencyFormat(orderItem.totalPrice)}</strong>
                           </div>
                        </div>
                     )
                  })}
                  <div className={styles.footer}>
                     <strong>Tổng số đơn hàng: {`   ` + totalOrderProduct}</strong>
                     <strong>Tổng giá trị đơn hàng: {`   ` + currencyFormat(totalOrderPrice)}</strong>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default OrderList
