import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ isUser }) => {
  if (!isUser) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
