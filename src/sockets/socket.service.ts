import { io, Socket } from 'socket.io-client'

const VITE_BASE_ENDPOINT = 'http://localhost:4000'

export let socket: Socket

class SocketService {
  setupSocketConnection() {
    socket = io(VITE_BASE_ENDPOINT, {
      transports: ['websocket'],
      secure: true
    })
    this.socketConnectionEvents()
  }

  private socketConnectionEvents() {
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('disconnect', (reason: Socket.DisconnectReason) => {
      console.log(`Reason: ${reason}`)
      socket.connect()
    })

    socket.on('connect_error', (error: Error) => {
      console.log(`${error}`)
      socket.connect()
    })
  }
}

export const socketService = new SocketService()
