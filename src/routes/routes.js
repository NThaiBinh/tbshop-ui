import Login from '../components/Layouts/components/Login/Login'
import DefaultLayout from '../components/Layouts/DefaultLayout/DefaultLayout'
import Home from '../pages/Home/Home'
import DashbroadLayout from '../components/Layouts/DashboardLayout/DashbroadLayout'
import Position from '../pages/Position/Position'
import Employee from '../pages/Employee/Employee'
import NotFound from '../pages/NotFound/NotFound'
import Create from '../components/Layouts/components/Create/Create'
import Manufacturer from '../pages/Manudacturer/Manufacturer/Manufacturer'
import CreateManufacturer from '../pages/Manudacturer/CreateManufacturer/CreateManufacturer'
import UpdateManufacturer from '../pages/Manudacturer/UpdateManufacturer/UpdateManufacturer'
import GeneralCategory from '../pages/GeneralCategory/GeneralCategory/GeneralCategory'
import CreateCategory from '../pages/GeneralCategory/CreateCategory/CreateCategory'
import UpdateCategory from '../pages/GeneralCategory/UpdateCategory/UpdateCategory'
import CreateProductType from '../pages/GeneralCategory/CreateProductType/CreateProductType'
import UpdateProductType from '../pages/GeneralCategory/UpdateProductType/UpdateProductType'
import Product from '../pages/Product/Product/Product'
import CreateProduct from '../pages/Product/CreateProduct/CreateProduct'
import UpdateProduct from '../pages/Product/UpdateProduct/UpdateProduct'
import ProductDetail from '../pages/components/ProductDetail/ProductDetail'
import Discount from '../pages/Discount/Discount/Discount'
import CreateStorewideDiscount from '../pages/Discount/CreateStorewideDiscount/CreateStorewideDiscount'
import CreateProductDiscount from '../pages/Discount/CreateProductDiscount/CreateProductDiscount'
import Role from '../pages/AccessPermissions/Role/Role'
import Cart from '../pages/Cart/Cart'

const publicRoutes = [
   { path: '/', component: Home, layout: DefaultLayout },
   { path: '/login', component: Login, layout: DefaultLayout },
   { path: '/register', component: Login, layout: DefaultLayout },
   { path: '/products', component: Home, layout: DefaultLayout },
   { path: '/product/detail', component: Home, layout: DefaultLayout, modal: ProductDetail },
   {
      path: '/cart',
      component: Cart,
      layout: DefaultLayout,
   },
   { path: '*', component: NotFound, layout: DefaultLayout },
]

const privateRoutes = [
   { path: '/dashbroad', component: Home, layout: DashbroadLayout },
   { path: '/dashbroad/general-categories', component: GeneralCategory, layout: DashbroadLayout },
   {
      path: '/dashbroad/general-categories/category/create',
      component: GeneralCategory,
      layout: DashbroadLayout,
      edit: CreateCategory,
   },
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
   { path: '/dashbroad/products/page/:page', component: Product, layout: DashbroadLayout },
   { path: '/dashbroad/products/create', component: CreateProduct, layout: DashbroadLayout },
   { path: '/dashbroad/products/edit', component: UpdateProduct, layout: DashbroadLayout },
   { path: '/dashbroad/positions/page/:page', component: Position, layout: DashbroadLayout },
   { path: '/dashbroad/positions/create', component: Create, layout: DashbroadLayout },
   { path: '/dashbroad/employees/page/:employeeId', component: Employee, layout: DashbroadLayout },
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
   { path: '*', component: NotFound, layout: DefaultLayout },
]

export { publicRoutes, privateRoutes }
