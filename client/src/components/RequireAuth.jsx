import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Spinner from './Spinner'

export function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user === null) {
    return <Spinner />
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
