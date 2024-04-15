import { useRoutes } from 'react-router-dom'

import AppPage from './features/AppPage'
import Home from './features/home/Home'
import ResetPassword from './features/auth/components/ResetPassword'

export default function AppRouter() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/reset_password',
      element: <ResetPassword />
    }
  ])
  return routeElements
}
