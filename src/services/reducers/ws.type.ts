import { TMessage } from '../../types'

export type WsStore = {
    wsConnected: boolean
    messages: TMessage | null
    error: string | null | WebSocketEventMap
}