import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import StoreContext from '../../../../store/StoreContext'

function ProtectedUserRoute({ children, currentUserId }) {
   const { userId } = useParams()
   const [state, dispatch] = useContext(StoreContext)

   if (!state.isLogin) {
      return <Navigate to="/login" replace />
   }

   if (userId !== currentUserId) {
      return <Navigate to="/" replace />
   }

   return children
}

export default ProtectedUserRoute
