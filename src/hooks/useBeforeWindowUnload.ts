import { useEffect } from 'react'
import { getDataFromSessionStorage } from 'src/shared/utils/utils.service'
import { socket } from 'src/sockets/socket.service'

const useBeforeWindowUnload = () => {
  useEffect(() => {
    // If the user closes the browser, we emit the socket io event
    window.addEventListener('beforeunload', () => {
      const loggedInUsername: string = getDataFromSessionStorage('loggedInUser')
      socket.emit('removeLoggedInUser', loggedInUsername)
    })
  }, [])
}

export default useBeforeWindowUnload
