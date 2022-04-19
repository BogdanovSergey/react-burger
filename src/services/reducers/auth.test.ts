import {
    LOGIN,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from '../actions/auth';
import { AuthStore} from "./auth.types";
import {authReducer} from './auth';
import {TUser} from "../../types";

const user: TUser = {
    email: 'sbugs@mail.ru',
    name: 'SuperBurger',
    password: ''
};
const initialState:AuthStore =
    {
        login: false,
        authorized : false,
        user: user,
        getUserRequest:false,
        refreshTokenRequest:false,
        tokenIsGood:false
    };

describe('check authReducer', () => {

    it('check LOGIN', () => {
        const expected = {
            ...initialState,
            authorized: true,
            login: true
        };
        const received = authReducer(initialState, {
            type: LOGIN,
            user: user
        });
        expect(received).toEqual(expected)
    })

    it('check LOGOUT', () => {
        const expected = {
            ...initialState,
            authorized: false,
            login: false,
            user: {
                email: '',
                name: '',
                password: ''
            }
        };
        const received = authReducer(initialState, {
            type: LOGOUT
        });
        expect(received).toEqual(expected)
    });

    it('check GET_USER_REQUEST', () => {
        const expected = {
            ...initialState,
            getUserRequest: true,

        };
        const received = authReducer(initialState, {
            type: GET_USER_REQUEST
        });
        expect(received).toEqual(expected)
    });

    it('check GET_USER_SUCCESS', () => {
        const expected = {
            ...initialState,
            getUserRequest : false,
            authorized : true
        };
        const received = authReducer(initialState, {
            type: GET_USER_SUCCESS,
            user: user
        });
        expect(received).toEqual(expected)
    });

    it('check GET_USER_FAILED', () => {
        const expected = {
            ...initialState,
            getUserRequest : false,
            authorized: false,
            user: {
                email: '',
                name: '',
                password: ''
            }
        };
        const received = authReducer(initialState, {
            type: GET_USER_FAILED
        });
        expect(received).toEqual(expected)
    });

    it('check REFRESH_TOKEN_REQUEST', () => {
        const expected = {
            ...initialState,
            refreshTokenRequest: true,
            tokenIsGood : false
        };
        const received = authReducer(initialState, {
            type: REFRESH_TOKEN_REQUEST
        });
        expect(received).toEqual(expected)
    });

    it('check REFRESH_TOKEN_SUCCESS', () => {
        const expected = {
            ...initialState,
            authorized : true,
            refreshTokenRequest: false,
            tokenIsGood : true
        };
        const received = authReducer(initialState, {
            type: REFRESH_TOKEN_SUCCESS
        });
        expect(received).toEqual(expected)
    });

    it('check REFRESH_TOKEN_FAILED', () => {
        const expected = {
            ...initialState,
            authorized : false,
            refreshTokenRequest: false,
            tokenIsGood : false
        };
        const received = authReducer(initialState, {
            type: REFRESH_TOKEN_FAILED
        });
        expect(received).toEqual(expected)
    });

})
