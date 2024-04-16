import { useRoutes } from 'react-router-dom'

import AppPage from './features/AppPage'
import ConfirmEmail from './features/auth/components/ConfirmEmail'
import ResetPassword from './features/auth/components/ResetPassword'
import Home from './features/home/Home'
import ProtectedRoute from './features/ProtectedRoute'

export default function AppRouter() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/reset_password',
      element: <ResetPassword />
    },
    {
      path: '/confirm_email',
      element: <ConfirmEmail />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    }
  ])
  return routeElements
}
