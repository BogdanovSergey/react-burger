import { WsStore } from './ws.type'
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/wsActions'
import {wsReducer} from "./wsReducer";
import {TMessage} from "../../types";

const initialState: WsStore = {
    wsConnected: false,
    messages: null,
    error: ''
};
const messages: TMessage =
    {
        orders: [
            {
                createdAt: new Date("2022-04-15T05:07:37.636Z"),
                ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c9"],
                name: "Флюоресцентный бессмертный бургер",
                number: 13672,
                status: "done",
                updatedAt: new Date("2022-04-15T05:07:37.636Z"),
                _id: "61473cbddab0f3001bb06df8",
                price: 2325,
                __v: 0
            }
        ],
        success: true,
        total: 3475,
        totalToday: 69,
    };

describe('check ingredientsReducer', () => {

    it('check WS_CONNECTION_SUCCESS', () => {
        const expected = {
            ...initialState,
            error: null,
            wsConnected: true
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        });
        expect(received).toEqual(expected)
    });

    it('check WS_CONNECTION_ERROR', () => {
        const expected = {
            ...initialState,
            error: null,
            wsConnected: false
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_ERROR,
            payload: null
        });
        expect(received).toEqual(expected)
    });

    it('check WS_CONNECTION_CLOSED', () => {
        const expected = {
            messages: null,
            error: null,
            wsConnected: false
        };
        const received = wsReducer(initialState, {
            type: WS_CONNECTION_CLOSED
        });
        expect(received).toEqual(expected)
    });

    it('check WS_GET_MESSAGE', () => {
        const expected = {
            ...initialState,
            messages: messages,
            error: null

        };
        const received = wsReducer(initialState, {
            type: WS_GET_MESSAGE,
            payload:messages
        });
        expect(received).toEqual(expected)
    });

});
