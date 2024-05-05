import { Navigate, useRoutes } from 'react-router-dom'

import AppPage from './features/AppPage'
import ConfirmEmail from './features/auth/components/ConfirmEmail'
import ResetPassword from './features/auth/components/ResetPassword'
import BuyerDashboard from './features/buyer/components/BuyerDashboard'
import PageNotFound from './features/error/PageNotFound'
import AddGig from './features/gigs/components/gig/AddGig'
import EditGig from './features/gigs/components/gig/EditGig'
import Gigs from './features/gigs/components/gigs/Gigs'
import GigView from './features/gigs/components/view/GigView'
import Home from './features/home/Home'
import ProtectedRoute from './features/ProtectedRoute'
import AddSeller from './features/seller/components/add/AddSeller'
import ManageEarnings from './features/seller/components/dashboard/ManageEarnings'
import ManageOrders from './features/seller/components/dashboard/ManageOrders'
import Seller from './features/seller/components/dashboard/Seller'
import SellerDashboard from './features/seller/components/dashboard/SellerDashboard'
import CurrentSellerProfile from './features/seller/components/profile/CurrentSellerProfile'
import SellerProfile from './features/seller/components/profile/SellerProfile'
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
      path: '/seller_profile/:username/:sellerId/edit',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <CurrentSellerProfile />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/seller_profile/:username/:sellerId/view',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <SellerProfile />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/:username/:sellerId',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <Seller />
          </Layout>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="seller_dashboard" />
        },
        {
          path: 'seller_dashboard',
          element: <SellerDashboard />
        },
        {
          path: 'manage_orders',
          element: <ManageOrders />
        },
        {
          path: 'manage_earnings',
          element: <ManageEarnings />
        }
      ]
    },
    {
      path: '/manage_gigs/new/:sellerId',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <AddGig />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/manage_gigs/edit/:gigId',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <EditGig />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/gig/:username/:title/:sellerId/:gigId/view',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <GigView />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/categories/:category',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <Gigs type="categories" />
          </Layout>
        </ProtectedRoute>
      )
    },
    {
      path: '/search/:gigs',
      element: (
        <ProtectedRoute>
          <Layout backgroundColor="#fff">
            <Gigs type="search" />
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
