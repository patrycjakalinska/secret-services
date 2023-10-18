import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ user }) => {
  if (Object.keys(user).length === 0) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
