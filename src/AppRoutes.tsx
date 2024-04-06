import { useRoutes } from 'react-router-dom'
import Home from './features/home/Home'
import AppPage from './features/AppPage'

export default function AppRoutes() {
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
