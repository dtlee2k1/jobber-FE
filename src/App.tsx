import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppRouter from './AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex min-h-screen w-screen flex-col">
        <AppRouter />
        <ToastContainer bodyClassName={() => 'text-sm flex p-2 items-center'} />
      </div>
    </BrowserRouter>
  )
}

export default App
