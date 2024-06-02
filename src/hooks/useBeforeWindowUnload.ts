import { useEffect } from 'react'
import { getDataFromSessionStorage } from 'src/shared/utils/utils.service'
import { socket } from 'src/sockets/socket.service'

const useBeforeWindowUnload = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      const loggedInUsername: string = getDataFromSessionStorage('loggedInUser')
      socket.emit('removeLoggedInUser', loggedInUsername)
    })
  }, [])
}

export default useBeforeWindowUnload
