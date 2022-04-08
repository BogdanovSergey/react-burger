import { Dispatch } from 'redux'
import {
    TWSActions,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
    WS_SEND_MESSAGE
} from '../actions/wsActions';
import {getCookie} from '../../utils/cookie';
import { AnyAction, MiddlewareAPI } from 'redux';

export const socketMiddleware = (feedsUrl:string, auth:boolean/*wsActions?: TWSActions*/) => {
    return (store: { dispatch: Dispatch<TWSActions> }) => {
        let socket: any = null;

        return (next : (i: AnyAction) => void) => (action: AnyAction) => {
            const { dispatch } = store;
            //console.log(action);
            const { type, payload } = action;
            const token =getCookie('token');
            //(`${feedsUrl}?token=${token}`)
            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(payload)
                //console.log(payload)
                //socket = new WebSocket(`${feedsUrl}?token=${payload}`);
            }
            if (socket) {
                socket.onopen = (event: WebSocketEventMap) => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event })
                };

                socket.onerror = (event: WebSocketEventMap) => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event })
                };

                socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: WS_GET_MESSAGE, payload: parsedData })
                };

                socket.onclose = (event: WebSocketEventMap) => {
                    dispatch({ type: WS_CONNECTION_CLOSED, payload: event })
                }

                if (type === WS_SEND_MESSAGE) {
                    const message = payload;
                    socket.send(JSON.stringify(message))
                }
            }

            next(action)
        }
    }
};