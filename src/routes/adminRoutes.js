import DashbroadLayout from '../components/Layouts/DashboardLayout/DashbroadLayout'
import Position from '../pages/Dashbroad/Position/Position'
import Employee from '../pages/Dashbroad/Employee/Employee'
import CreatePosition from '../pages/Dashbroad/Position/CreatePosition/CreatePosition'
import Manufacturer from '../pages/Dashbroad/Manudacturer/Manufacturer'
import CreateManufacturer from '../pages/Dashbroad/Manudacturer/CreateManufacturer/CreateManufacturer'
import UpdateManufacturer from '../pages/Dashbroad/Manudacturer/UpdateManufacturer/UpdateManufacturer'
import GeneralCategory from '../pages/Dashbroad/GeneralCategory/GeneralCategory'
import UpdateCategory from '../pages/Dashbroad/GeneralCategory/UpdateCategory/UpdateCategory'
import CreateProductType from '../pages/Dashbroad/GeneralCategory/CreateProductType/CreateProductType'
import UpdateProductType from '../pages/Dashbroad/GeneralCategory/UpdateProductType/UpdateProductType'
import Product from '../pages/Dashbroad/Product/Product/Product'
import CreateProduct from '../pages/Dashbroad/Product/CreateProduct/CreateProduct'
import UpdateProduct from '../pages/Dashbroad/Product/UpdateProduct/UpdateProduct'
import Discount from '../pages/Dashbroad/Discount/Discount'
import CreateProductDiscount from '../pages/Dashbroad/Discount/CreateProductDiscount/CreateProductDiscount'
import UpdatePosition from '../pages/Dashbroad/Position/UpdatePosition/UpdatePosition'
import CreateEmployee from '../pages/Dashbroad/Employee/CreateEmployee/CreateEmployee'
import UpdateEmployee from '../pages/Dashbroad/Employee/UpdateEmployee/UpdateEmployee'
import AccessPermissions from '../pages/Dashbroad/AccessPermissions/AccessPermissions'
import CreateAccountEmployee from '../pages/Dashbroad/AccessPermissions/CreateAccountEmployee/CreateAccountEmployee'
import Printable from '../pages/components/Printable/Printable'
import Statistical from '../pages/Dashbroad/Statistical/Statistical'
import OrderPending from '../pages/Dashbroad/Order/OrderPending/OrderPending'
import OrderDelivering from '../pages/Dashbroad/Order/OrderDelivering/OrderDelivering'
import OrderDelivered from '../pages/Dashbroad/Order/OrderDelivered/OrderDelivered'
import UpdateStoreInfo from '../pages/Dashbroad/StoreInfo/UpdateStoreInfo/UpdateStoreInfo'
import Customer from '../pages/Dashbroad/Customer/Customer'
import PrintInvoice from '../pages/components/PrintInvoice/PrintInvoice'

export const adminRoutes = [
   {
      path: '/dashbroad/store-info/edit',
      component: Statistical,
      layout: DashbroadLayout,
      edit: UpdateStoreInfo,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/general-categories',
      component: GeneralCategory,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/general-categories/category/edit/:categoryId',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: UpdateCategory,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/general-categories/product-type/create/',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: CreateProductType,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/general-categories/product-type/edit/:productTypeId',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: UpdateProductType,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/manufacturers/page/:page',
      component: Manufacturer,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/manufacturers/create',
      component: CreateManufacturer,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/manufacturers/edit/:manufacId',
      component: UpdateManufacturer,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/products/page/:page',
      component: Product,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/products/create',
      component: CreateProduct,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/products/edit',
      component: UpdateProduct,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   { path: '/dashbroad/positions', component: Position, layout: DashbroadLayout, allowedRoles: ['admin', 'editor'] },
   {
      path: '/dashbroad/positions/create',
      component: CreatePosition,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/positions/edit/:positionId',
      component: UpdatePosition,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   { path: '/dashbroad/employees', component: Employee, layout: DashbroadLayout, allowedRoles: ['admin', 'editor'] },
   {
      path: '/dashbroad/employees/create',
      component: CreateEmployee,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/employees/edit/:employeeId',
      component: UpdateEmployee,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/discounts/page/:page',
      component: Discount,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/discounts/product-discount/create',
      component: CreateProductDiscount,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/acccess-permissions',
      component: AccessPermissions,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/acccess-permissions/employee-account/create',
      component: AccessPermissions,
      layout: DashbroadLayout,
      edit: CreateAccountEmployee,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/orders-pending',
      component: OrderPending,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/orders-delivering',
      component: OrderDelivering,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/orders-delivered',
      component: OrderDelivered,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/orders-delivering/print/:invoiceId',
      component: OrderDelivering,
      layout: DashbroadLayout,
      edit: PrintInvoice,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/statistical',
      component: Statistical,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   {
      path: '/dashbroad/customers',
      component: Customer,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
]
