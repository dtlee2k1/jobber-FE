import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppRouter from './AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex min-h-screen w-screen flex-col ">
        <AppRouter />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
