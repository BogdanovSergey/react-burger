import { TOrder } from '../../types'
import {
    ORDER_LOAD,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLEAR_ORDER
} from '../actions/index'


export type OrderLoadAction = {
    type: typeof ORDER_LOAD
    number : number
}

export type GetOrderAction = {
    type: typeof GET_ORDER
}

export type GetOrderActionSuccess = {
    type: typeof GET_ORDER_SUCCESS
    order: TOrder
}

export type GetOrderActionFailed = {
    type: typeof GET_ORDER_FAILED
}

export type ClearOrderAction = {
    type: typeof CLEAR_ORDER
    order: null
}

export type OrderActions =
    OrderLoadAction
    | GetOrderAction
    | GetOrderActionSuccess
    | GetOrderActionFailed
    | ClearOrderAction

export type TGetOrderResponse = {
    name: string
    orders: TOrder[]
    success: boolean
} & Response

export type OrderStore = {
    number?: number
    orderRequest: boolean
    orderFailed: boolean
    order: TOrder | null
}
