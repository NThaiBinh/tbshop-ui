import { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/routes'
import StoreContext from './store/StoreContext'
import { setIsLogin } from './store/actions'
import Toast from './components/Layouts/components/Toast/Toast'
import ProtectedRoute from './components/Layouts/components/ProtectedRoute/ProtectedRoute'
import Loading from './pages/components/Loading/Loading'

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
               {privateRoutes.map((privateRoute, index) => {
                  const Layout = privateRoute.layout
                  const Page = privateRoute.component
                  const EditPage = privateRoute.edit
                  return (
                     <Route
                        key={index}
                        path={privateRoute.path}
                        element={
                           <ProtectedRoute allowedRoles={['admin', 'editor']} userRoles={userInfo?.roles}>
                              <Layout>
                                 {EditPage && <EditPage />}
                                 <Page />
                              </Layout>
                           </ProtectedRoute>
                        }
                     />
                  )
               })}
            </Routes>
         </div>
      )
   }
}

export default App
