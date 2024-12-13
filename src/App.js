import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/publicRoutes'
import { adminRoutes } from './routes/adminRoutes'
import { userRoutes } from './routes/userRoutes'
import StoreContext from './store/StoreContext'
import { setIsLogin } from './store/actions'
import Toast from './components/Layouts/components/Toast/Toast'
import NotFound from './pages/NotFound/NotFound'
import ProtectedAdminRoute from './components/Layouts/components/ProtectedAdminRoute/ProtectedAdminRoute'
import ProtectedUserRoute from './components/Layouts/components/ProtectedUserRoute/ProtectedUserRoute'

function App() {
   const [state, dispatch] = useContext(StoreContext)
   const [userInfo, setUserInfo] = useState()
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')

      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
         dispatch(setIsLogin(true))
      }

      setLoading(false)
   }, [state.isLogin])

   if (loading) {
      return null
   } else {
      return (
         <div className="App">
            {state.isShowToast && <Toast type={state.toastType} message={state.toastMessage} />}
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

               {adminRoutes.map((privateRoute, index) => {
                  const Layout = privateRoute.layout
                  const Page = privateRoute.component
                  const EditPage = privateRoute.edit
                  const allowedRoles = privateRoute.allowedRoles
                  return (
                     <Route
                        key={index}
                        path={privateRoute.path}
                        element={
                           <ProtectedAdminRoute allowedRoles={allowedRoles} userRoles={userInfo?.roles}>
                              <Layout>
                                 <Page />
                                 {EditPage && <EditPage />}
                              </Layout>
                           </ProtectedAdminRoute>
                        }
                     />
                  )
               })}
               {userRoutes.map((userRoute, index) => {
                  const Layout = userRoute.layout
                  const Page = userRoute.component
                  return (
                     <Route
                        key={index}
                        path={userRoute.path}
                        element={
                           <ProtectedUserRoute>
                              <Layout>
                                 <Page />
                              </Layout>
                           </ProtectedUserRoute>
                        }
                     />
                  )
               })}
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      )
   }
}

export default App
