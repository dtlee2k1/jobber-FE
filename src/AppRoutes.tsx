import { useRoutes } from 'react-router-dom'

import AppPage from './features/AppPage'
import ConfirmEmail from './features/auth/components/ConfirmEmail'
import ResetPassword from './features/auth/components/ResetPassword'
import BuyerDashboard from './features/buyer/components/BuyerDashboard'
import PageNotFound from './features/error/PageNotFound'
import Home from './features/home/Home'
import ProtectedRoute from './features/ProtectedRoute'
import AddSeller from './features/seller/components/add/AddSeller'
import Layout from './layouts/Layout'

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
          <Layout backgroundColor="#fff">
            <Home />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <BuyerDashboard />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <AddSeller />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
  return routeElements
}
