import { TMessage } from '../../types'

export type WsStore = {
    wsConnected: boolean
    messages: TMessage[]
    error: string
}