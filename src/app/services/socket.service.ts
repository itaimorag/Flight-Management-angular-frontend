import io,{Socket} from 'socket.io-client'

export const SOCKET_EVENT_FLIGHT_UPDATE = 'flight-update'

// const baseUrl = (process.env['NODE_ENV'] === 'production') ? '/' : '//localhost:3030'
export const socketService = createSocketService()
const baseUrl ='//localhost:3030'
socketService.setup()

function createSocketService() {
  var socket:Socket|null = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName:string, cb:any) {
      socket?.on(eventName, cb)
    },
  }
  return socketService
}


