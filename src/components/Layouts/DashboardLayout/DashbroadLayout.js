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
                  viewAll="Xem tất cả danh mục tổng hợp"
                  addNews={[
                     { title: 'Thêm danh mục', objectChildren: 'category' },
                     { title: 'Thêm loại sản phẩm', objectChildren: 'product-type' },
                  ]}
                  objectHandle="general-categories"
                  pagination={false}
               />
               <DashbroadMenu
                  title="Quản lý nhà sản xuất"
                  viewAll="Xem tất cả nhà sản xuất"
                  addNews={[{ title: 'Thêm nhà sản xuất' }]}
                  objectHandle="manufacturers"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Quản lý sản phẩm"
                  viewAll="Xem tất cả sản phẩm"
                  addNews={[{ title: 'Thêm sản phẩm hoặc cấu hình' }]}
                  objectHandle="products"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Khuyến mãi"
                  viewAll="Xem danh mục khuyến mãi"
                  addNews={[
                     { title: 'Thêm khuyến mãi chung', objectChildren: 'storewide-discount' },
                     { title: 'Thêm khuyến mãi cho sản phẩm', objectChildren: 'product-discount' },
                  ]}
                  objectHandle="discounts"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Quản lý chức vụ"
                  viewAll="Danh sách chức vụ"
                  addNews={[{ title: 'Thêm chức vụ' }]}
                  objectHandle="positions"
               />

               <DashbroadMenu
                  title="Quản lý nhân viên"
                  viewAll="Danh sách nhân viên"
                  addNews={[{ title: 'Thêm nhân viên' }]}
                  objectHandle="positions"
                  pagination={true}
               />

               <DashbroadMenu
                  title="Quản lý quyền hạn"
                  viewAll="Danh sách quyền và vai trò"
                  addNews={[
                     { title: 'Thêm vai trò', objectChildren: 'add-role' },
                     { title: 'Thêm quyền hạn', objectChildren: 'add-permission' },
                  ]}
                  objectHandle="acccess-permissions"
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
