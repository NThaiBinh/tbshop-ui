import Cart from '../pages/Cart/Cart'
import Profile from '../pages/Profile/Profile'
import Address from '../pages/Address/Address'
import Order from '../pages/Order/Order'
import DefaultLayout from '../components/Layouts/DefaultLayout/DefaultLayout'

export const userRoutes = [
   {
      path: '/cart/',
      component: Cart,
      layout: DefaultLayout,
   },
   {
      path: '/profile',
      component: Profile,
      layout: DefaultLayout,
   },
   {
      path: '/address',
      component: Address,
      layout: DefaultLayout,
   },
   {
      path: '/orders',
      component: Order,
      layout: DefaultLayout,
   },
]
