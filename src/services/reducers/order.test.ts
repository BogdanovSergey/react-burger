import {TOrder, TUser} from "../../types";

import {TOrderStore} from "./order.types";
import {CLEAR_ORDER, GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, ORDER_LOAD} from "../actions";
import {orderReducer} from "./order";

const user: TUser = {
    email: 'ivan@ivan.ru',
    name: 'Иванов Иван Иванович',
    password: ''
};
const order:TOrder =
    {
        createdAt: new Date("2022-04-15T05:07:37.636Z"),
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c9"],
        name: "Флюоресцентный бессмертный бургер",
        number: 13672,
        owner: {
            createdAt: new Date("2022-04-15T05:07:37.636Z"),
            updatedAt: new Date("2022-04-15T05:07:37.636Z"),
            email: 'sbugs@mail.ru',
            name: 'SuperBurger'
        },
        price: 2325,
        status: "done",
        updatedAt: new Date("2022-04-15T05:07:37.636Z"),
        __v: 0,
        _id: "61473cbddab0f3001bb06df8"
    };
const initialState:TOrderStore =
    {
        number: 0,
        order: null,
        orderRequest: false,
        orderFailed: false,
    };
describe('check authReducer', () => {

    it('check ORDER_LOAD', () => {
        const expected = {
            ...initialState
        };
        const received = orderReducer(initialState, {
            type: ORDER_LOAD,
            number: 0
        });
        expect(received).toEqual(expected)
    });

    it('check GET_ORDER', () => {
        const expected = {
            ...initialState,
            orderRequest: true,
            orderFailed: false
        };
        const received = orderReducer(initialState, {
            type: GET_ORDER
        });
        expect(received).toEqual(expected)
    });

    it('check GET_ORDER_SUCCESS', () => {
        const expected = {
            ...initialState,
            orderRequest: false,
            order:order
        };
        const received = orderReducer(initialState, {
            type: GET_ORDER_SUCCESS,
            order:order
        });
        expect(received).toEqual(expected)
    });

    it('check GET_ORDER_FAILED', () => {
        const expected = {
            ...initialState,
            orderFailed: true,
            orderRequest: false
        };
        const received = orderReducer(initialState, {
            type: GET_ORDER_FAILED
        });
        expect(received).toEqual(expected)
    });

    it('check CLEAR_ORDER', () => {
        const expected = {
            ...initialState,
            number: 0,
            order: null
        };
        const received = orderReducer(initialState, {
            type: CLEAR_ORDER
        });
        expect(received).toEqual(expected)
    });

});