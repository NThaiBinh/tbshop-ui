import Login from '../components/Layouts/components/Login/Login'
import DefaultLayout from '../components/Layouts/DefaultLayout/DefaultLayout'
import Home from '../pages/Home/Home'
import ProductDetail from '../pages/components/ProductDetail/ProductDetail'
import Cart from '../pages/Cart/Cart'
import Profile from '../pages/Profile/Profile'
import Address from '../pages/Address/Address'
import Order from '../pages/Order/Order'
import Phone from '../pages/Phone/Phone'
import Laptop from '../pages/Laptop/Laptop'

const publicRoutes = [
   { path: '/', component: Home, layout: DefaultLayout },
   { path: '/login', component: Login, layout: DefaultLayout },
   { path: '/register', component: Login, layout: DefaultLayout },
   { path: '/products', component: Home, layout: DefaultLayout },
   { path: '/phones', component: Phone, layout: DefaultLayout },
   { path: '/phones/detail', component: Phone, layout: DefaultLayout, modal: ProductDetail },
   { path: '/laptops', component: Laptop, layout: DefaultLayout },
   { path: '/laptops/detail', component: Laptop, layout: DefaultLayout, modal: ProductDetail },
   { path: '/product/detail', component: Home, layout: DefaultLayout, modal: ProductDetail },
]

const userRoutes = [
   {
      path: '/cart/',
      component: Cart,
      layout: DefaultLayout,
   },
   {
      path: '/user/profile',
      component: Profile,
      layout: DefaultLayout,
   },
   {
      path: '/user/address',
      component: Address,
      layout: DefaultLayout,
   },
   {
      path: '/user/orders',
      component: Order,
      layout: DefaultLayout,
   },
]

export { publicRoutes, userRoutes }
