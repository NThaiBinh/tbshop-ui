import { useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { publicRoutes, privateRoutes } from './routes/routes'
import StoreContext from './store/StoreContext'
import { setLocation, setShowToast } from './store/actions'
import Login from './components/Layouts/components/Login/Login'

function App() {
   const [state, dispatch] = useContext(StoreContext)
   const location = useLocation()

   useEffect(() => {
      if (location.pathname !== '/login') dispatch(setLocation(location.pathname))
      else dispatch(setLocation('/'))
   }, [])
   return (
      <div className="App">
         <Routes>
            {publicRoutes.map((publicRoute, index) => {
               const Layout = publicRoute.layout
               const Page = publicRoute.component
               const Modal = publicRoute.modal
               return (
                  <Route
                     key={index}
                     path={publicRoute.path}
                     element={
                        <Layout>
                           {Modal && <Modal />}
                           <Page />
                        </Layout>
                     }
                  />
               )
            })}
            {privateRoutes.map((privateRoute, index) => {
               const Layout = privateRoute.layout
               const Page = privateRoute.component
               const EditPage = privateRoute.edit
               const isLogin = Cookies.get('customerId')
               return (
                  <Route
                     key={index}
                     path={privateRoute.path}
                     element={
                        <Layout>
                           {/* {!isLogin && <Login />} */}
                           {EditPage && <EditPage />}
                           <Page />
                        </Layout>
                     }
                  />
               )
            })}
         </Routes>
      </div>
   )
}

export default App
