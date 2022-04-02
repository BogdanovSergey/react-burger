import {OrderActions} from './order.types';
import {
    ORDER_LOAD,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/index'

const initialState =
    {
        number: 0,
        order: null,
        orderRequest: false,
        orderFailed: false,
    };

export const orderReducer = (state = initialState, action:OrderActions) => {
    switch (action.type) {

        case ORDER_LOAD:
            return {
                ...state,
                number: action.number
            };
        case GET_ORDER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        case CLEAR_ORDER: {
            return {
                ...state,
                order: null
            }
        }

        default: {
            return state;
        }
    }
}
