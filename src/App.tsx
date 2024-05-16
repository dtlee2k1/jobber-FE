import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppRouter from './AppRoutes'
import useBeforeWindowUnload from './hooks/useBeforeWindowUnload'
import { socketService } from './sockets/socket.service'

function App() {
  useBeforeWindowUnload()

  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])

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
