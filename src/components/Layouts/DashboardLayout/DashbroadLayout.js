import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './DashbroadLayout.module.css'
import StoreContext from '../../../store/StoreContext'
import UserInfo from '../components/UserInfo/UserInfo'
import img from '../../../pages/imagePages/1.png'
import DashbroadMenu from '../components/DashbroadMenu/DashbroadMenu'
import SearchDashbroad from '../../../pages/components/SearchDashbroad/SearchDashbroad'
import { setSearchDashbroad } from '../../../store/actions'

import { getStoreInfo } from '../../../services/storeServices'
import { imageApi } from '../../../services'

function Dashbroad({ children }) {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   const [storeInfo, setStoreInfo] = useState({})

   useEffect(() => {
      async function handleGetStoreInfo() {
         const result = await getStoreInfo()
         if (result.code === 'SS') {
            setStoreInfo(result.data)
         }
      }

      handleGetStoreInfo()
   }, [state.isUpdate])

   return (
      <div className={styles.wrapper}>
         <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
               <Link to="/" className={styles.storeLogo}>
                  <img className={styles.logo} src={`${imageApi}/${storeInfo.image}`} />
                  <h2 className={styles.storeName}>{storeInfo.name}</h2>
               </Link>
               <div className={styles.storeDetail}>
                  <ul className={styles.listInfo}>
                     <li className={styles.infoItem}>
                        <h4>Điện thoại:</h4>
                        <p>{storeInfo.phoneNumber}</p>
                     </li>
                     <li className={styles.infoItem}>
                        <h4>Email:</h4>
                        <p>{storeInfo.email}</p>
                     </li>
                     <li className={styles.infoItem}>
                        <h4>Địa chỉ:</h4>
                        <p>{storeInfo.address}</p>
                     </li>
                  </ul>
               </div>
               <button className={styles.action} onClick={() => navigate('/dashbroad/store-info/edit')}>
                  Chỉnh sửa thông tin
               </button>
            </div>
            <div className={styles.sidebarContainer}>
               <DashbroadMenu
                  title="Số liệu thống kê"
                  viewAlls={[{ title: 'Xem tất cả thống kê', objectView: 'statistical' }]}
                  addNews={[]}
                  objectHandle="statistical"
                  pagination={false}
               />
               <DashbroadMenu
                  title="Danh mục tổng hợp"
                  viewAlls={[{ title: 'Xem tất cả danh mục tổng hợp', objectView: 'general-categories' }]}
                  addNews={[{ title: 'Thêm loại sản phẩm', objectChildren: 'product-type' }]}
                  objectHandle="general-categories"
                  pagination={false}
               />
               <DashbroadMenu
                  title="Quản lý nhà sản xuất"
                  viewAlls={[{ title: 'Xem tất cả nhà sản xuất', objectView: 'manufacturers' }]}
                  addNews={[{ title: 'Thêm nhà sản xuất' }]}
                  objectHandle="manufacturers"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Quản lý sản phẩm"
                  viewAlls={[{ title: 'Xem tất cả sản phẩm', objectView: 'products' }]}
                  addNews={[{ title: 'Thêm sản phẩm hoặc cấu hình' }]}
                  objectHandle="products"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Khuyến mãi"
                  viewAlls={[{ title: 'Xem danh mục khuyến mãi', objectView: 'discounts' }]}
                  addNews={[{ title: 'Thêm khuyến mãi', objectChildren: 'product-discount' }]}
                  objectHandle="discounts"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Quản lý chức vụ"
                  viewAlls={[{ title: 'Danh sách chức vụ', objectView: 'positions' }]}
                  addNews={[{ title: 'Thêm chức vụ' }]}
                  objectHandle="positions"
               />

               <DashbroadMenu
                  title="Quản lý nhân viên"
                  viewAlls={[{ title: 'Danh sách nhân viên', objectView: 'employees' }]}
                  addNews={[{ title: 'Thêm nhân viên' }]}
                  objectHandle="employees"
                  pagination={false}
               />

               <DashbroadMenu
                  title="Quản lý khách hàng"
                  viewAlls={[{ title: 'Xem danh sách khách hàng', objectView: 'customers' }]}
                  addNews={[]}
                  objectHandle="customers"
                  pagination={false}
               />

               <DashbroadMenu
                  title="Tài khoản & phân quyền"
                  viewAlls={[{ title: 'Danh sách tài khoản & quyền', objectView: 'acccess-permissions' }]}
                  addNews={[{ title: 'Tạo tài khoản cho nhân viên', objectChildren: 'employee-account' }]}
                  objectHandle="acccess-permissions"
               />

               <DashbroadMenu
                  title="Đơn hàng"
                  viewAlls={[
                     { title: 'Đơn hàng chờ xác nhận', objectView: 'orders-pending' },
                     { title: 'Đơn hàng đang giao', objectView: 'orders-delivering' },
                     { title: 'Đơn hàng đã giao', objectView: 'orders-delivered' },
                  ]}
                  addNews={[]}
                  objectHandle="orders"
               />
            </div>
         </div>
         <div className={styles.container}>
            <div className={styles.header}>
               <SearchDashbroad
                  value={state.searchDashbroad}
                  onChange={(e) => dispatch(setSearchDashbroad(e.target.value))}
               />
               <UserInfo />
            </div>
            <div className={styles.content}>{children}</div>
         </div>
      </div>
   )
}

export default Dashbroad
