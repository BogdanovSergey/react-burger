import { Dispatch, AnyAction } from 'redux'
import {
    TWSActionNames,
    TWSActions
} from '../actions/wsActions';
import {getCookie} from '../../utils/cookie';

export const socketMiddleware = (wsActions: TWSActionNames) => {
    return (store: { dispatch: Dispatch<TWSActions> }) => {
        let socket: any = null;

        return (next : (i: AnyAction) => void) => (action: TWSActions) => {
            const { dispatch } = store;
            //const token = getCookie('token');
            if (action.type === wsActions.WS_CONNECTION_START) {
                socket = new WebSocket(action.payload)
            }
            if (socket) {
                socket.onopen = (event: WebSocketEventMap) => {
                    dispatch({ type: wsActions.WS_CONNECTION_SUCCESS, payload: event })
                };

                socket.onerror = (event: WebSocketEventMap) => {
                    dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event })
                };

                socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsActions.WS_GET_MESSAGE, payload: parsedData })
                };

                socket.onclose = (event: WebSocketEventMap) => {
                    dispatch({ type: wsActions.WS_CONNECTION_CLOSED, payload: event })
                };

                if (action.type === wsActions.WS_SEND_MESSAGE) {
                    const message = action.payload;
                    socket.send(JSON.stringify(message))
                }
            }

            next(action)
        }
    }
};