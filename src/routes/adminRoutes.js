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
import CreateStorewideDiscount from '../pages/Dashbroad/Discount/CreateStorewideDiscount/CreateStorewideDiscount'
import CreateProductDiscount from '../pages/Dashbroad/Discount/CreateProductDiscount/CreateProductDiscount'
import Role from '../pages/Dashbroad/AccessPermissions/Role/Role'
import Order from '../pages/Dashbroad/Order/Order'
import InvoiceDelivering from '../pages/Dashbroad/Invoice/InvoiceDelivering/InvoiceDelivering'
import UpdatePosition from '../pages/Dashbroad/Position/UpdatePosition/UpdatePosition'
import CreateEmployee from '../pages/Dashbroad/Employee/CreateEmployee/CreateEmployee'
import UpdateEmployee from '../pages/Dashbroad/Employee/UpdateEmployee/UpdateEmployee'

export const adminRoutes = [
   { path: '/dashbroad/general-categories', component: GeneralCategory, layout: DashbroadLayout },
   {
      path: '/dashbroad/general-categories/category/edit/:categoryId',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: UpdateCategory,
   },
   {
      path: '/dashbroad/general-categories/product-type/create/',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: CreateProductType,
   },
   {
      path: '/dashbroad/general-categories/product-type/edit/:productTypeId',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: UpdateProductType,
   },
   { path: '/dashbroad/manufacturers/page/:page', component: Manufacturer, layout: DashbroadLayout },
   { path: '/dashbroad/manufacturers/create', component: CreateManufacturer, layout: DashbroadLayout },
   { path: '/dashbroad/manufacturers/edit/:manufacId', component: UpdateManufacturer, layout: DashbroadLayout },
   {
      path: '/dashbroad/products/page/:page',
      component: Product,
      layout: DashbroadLayout,
      allowedRoles: ['admin', 'editor'],
   },
   { path: '/dashbroad/products/create', component: CreateProduct, layout: DashbroadLayout },
   { path: '/dashbroad/products/edit', component: UpdateProduct, layout: DashbroadLayout },
   { path: '/dashbroad/positions', component: Position, layout: DashbroadLayout },
   { path: '/dashbroad/positions/create', component: CreatePosition, layout: DashbroadLayout },
   { path: '/dashbroad/positions/edit/:positionId', component: UpdatePosition, layout: DashbroadLayout },
   { path: '/dashbroad/employees', component: Employee, layout: DashbroadLayout },
   { path: '/dashbroad/employees/create', component: CreateEmployee, layout: DashbroadLayout },
   { path: '/dashbroad/employees/edit/:employeeId', component: UpdateEmployee, layout: DashbroadLayout },
   { path: '/dashbroad/discounts/page/:page', component: Discount, layout: DashbroadLayout },
   {
      path: '/dashbroad/discounts/storewide-discount/create',
      component: CreateStorewideDiscount,
      layout: DashbroadLayout,
   },
   {
      path: '/dashbroad/discounts/product-discount/create',
      component: CreateProductDiscount,
      layout: DashbroadLayout,
   },
   {
      path: '/dashbroad/acccess-permissions/add-role/create',
      component: Role,
      layout: DashbroadLayout,
   },
   {
      path: '/dashbroad/orders',
      component: Order,
      layout: DashbroadLayout,
   },
   {
      path: '/dashbroad/orders-delivering',
      component: InvoiceDelivering,
      layout: DashbroadLayout,
   },
]
