import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRoles, userRoles = [] }) {
   if (userRoles && userRoles.some((userRole) => allowedRoles.some((allowedRole) => allowedRole === userRole))) {
      return children
   }
   return <Navigate to={'/'} />
}

export default ProtectedRoute
