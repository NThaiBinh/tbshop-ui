import Login from '../components/Layouts/components/Login/Login'
import DefaultLayout from '../components/Layouts/DefaultLayout/DefaultLayout'
import Home from '../pages/Home/Home'
import ProductDetail from '../pages/components/ProductDetail/ProductDetail'
import Phone from '../pages/Phone/Phone'
import Laptop from '../pages/Laptop/Laptop'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'

export const publicRoutes = [
   { path: '/', component: Home, layout: DefaultLayout },
   { path: '/login', component: Login, layout: DefaultLayout },
   { path: '/register', component: Login, layout: DefaultLayout },
   { path: '/products', component: Home, layout: DefaultLayout },
   { path: '/phones', component: Phone, layout: DefaultLayout },
   { path: '/phones/detail', component: Phone, layout: DefaultLayout, modal: ProductDetail },
   { path: '/laptops', component: Laptop, layout: DefaultLayout },
   { path: '/laptops/detail', component: Laptop, layout: DefaultLayout, modal: ProductDetail },
   { path: '/product/detail', component: Home, layout: DefaultLayout, modal: ProductDetail },
   { path: '/user/forgot-password', component: Home, layout: DefaultLayout, modal: ForgotPassword },
]
