import { useRoutes } from 'react-router-dom'

import AppPage from './features/AppPage'
import Home from './features/home/Home'

export default function AppRouter() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: '/',
      element: <Home />
    }
  ])
  return routeElements
}
