import { useContext } from 'react'
import StoreContext from '../../../store/StoreContext'
import cssDashbroadLayout from './DashbroadLayout.module.css'
import UserInfo from '../components/UserInfo/UserInfo'
import SearchInput from '../components/SearchInput/SearchInput'
import img from '../../../pages/imagePages/1.png'
import DashbroadMenu from '../components/DashbroadMenu/DashbroadMenu'

function Dashbroad({ children }) {
   const [state, dispatch] = useContext(StoreContext)

   return (
      <div className={cssDashbroadLayout.wrapper}>
         <div className={cssDashbroadLayout.sidebar}>
            <div className={cssDashbroadLayout.sidebarHeader}>
               <img className={cssDashbroadLayout.logo} src={img} />
               <div className={cssDashbroadLayout.title}>
                  <h2 className={cssDashbroadLayout.name}>TBSHOP</h2>
                  <p className={cssDashbroadLayout.description}>Quản trị website</p>
               </div>
            </div>

            <div className={cssDashbroadLayout.sidebarContainer}>
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
                  addNews={[
                     { title: 'Thêm khuyến mãi chung', objectChildren: 'storewide-discount' },
                     { title: 'Thêm khuyến mãi cho sản phẩm', objectChildren: 'product-discount' },
                  ]}
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
                  title="Quản lý quyền hạn"
                  viewAlls={[{ title: 'Danh sách quyền và vai trò', objectView: 'acccess-permissions' }]}
                  addNews={[
                     { title: 'Thêm vai trò', objectChildren: 'add-role' },
                     { title: 'Thêm quyền hạn', objectChildren: 'add-permission' },
                  ]}
                  objectHandle="acccess-permissions"
               />

               <DashbroadMenu
                  title="Đơn hàng"
                  viewAlls={[
                     { title: 'Đơn hàng chờ xác nhận', objectView: 'orders' },
                     { title: 'Đơn hàng đang giao', objectView: 'orders-delivering' },
                  ]}
                  addNews={[]}
                  objectHandle="orders"
               />
            </div>
         </div>
         <div className={cssDashbroadLayout.container}>
            <div className={cssDashbroadLayout.header}>
               <SearchInput />
               <UserInfo name="ADMIN" image="" />
            </div>
            <div className={cssDashbroadLayout.content}>{children}</div>
         </div>
      </div>
   )
}

export default Dashbroad
