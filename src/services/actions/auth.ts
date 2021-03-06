import {
    registerRequest,
    loginRequest,
    refreshTokenRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest} from '../../utils/api-requests';
import {setCookie, delCookie, getCookie} from "../../utils/cookie";
import {AppDispatch as Dispatch, AppThunk, TUser} from '../../types';

export const LOGIN = 'LOGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT = 'LOGOUT';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED  = 'REFRESH_TOKEN_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const registerAction:AppThunk = (state:TUser) => {
    return function (dispatch:Dispatch) {
        console.log('registerAction');
        registerRequest(state)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    setCookie('token', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user,
                    });

                } else {
                    dispatch({
                        type: REGISTER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: REGISTER_FAILED,
                });
            });
    }
}

export const loginAction:AppThunk =(state:TUser) => {
    return function (dispatch:Dispatch) {
        console.log('loginAction');
        return loginRequest(state)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    console.log('loginAction ok');
                    setCookie('token', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: LOGIN,
                        user: res.user,
                    });
                    return res;
                } else {
                    console.error(res.message)

                }
            })
            .catch((err) => {
                console.error('Error1: ', err);
            });
    };
};

export const refreshTokenAction:AppThunk = () => {
    return function (dispatch:Dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });
        console.log('refreshTokenAction')
        refreshTokenRequest()
            .then((res) => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken);
                const authToken = res.accessToken.split('Bearer ')[1];
                delCookie('token')
                setCookie('token', authToken);
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: REFRESH_TOKEN_FAILED
            });
            console.error('Error2: ', err);
        });
    };
}

export const logoutAction:AppThunk = () => {
    return function (dispatch:Dispatch) {
        logoutRequest()
            .then((res) => {
                if (res && res.success) {
                    delCookie('token');
                    localStorage.removeItem('refreshToken');
                    dispatch({
                        type: LOGOUT,
                    });
                    return true;
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    };
};

export const getUserAction:AppThunk = () => {
    return function (dispatch:Dispatch) {
        console.log('getUserAction: '+getCookie('token'))
        dispatch({
            type:
            GET_USER_REQUEST
        });
        return getUserRequest(getCookie('token'))
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    });
                }
            })
            .catch((err) => {
                console.log('Error3: ');
                console.log(err)
                dispatch({
                    type: GET_USER_FAILED
                });
                dispatch({
                    type: REFRESH_TOKEN_REQUEST,
                });
            });
    };
};
export const updateUserAction:AppThunk = (state:any) => {
    console.log('-=updateUserAction=-');
    return function (dispatch:Dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        updateUserRequest({
                    email : state.email,
                    name : state.name,
                    token : getCookie('token')})
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: GET_USER_FAILED,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_USER_FAILED,
                });
            });
    }
};
export interface ILoginAction { readonly type: typeof LOGIN; }
export interface IRegSuccessAction { readonly type: typeof REGISTER_SUCCESS; }
export interface IRegFailedAction { readonly type: typeof REGISTER_FAILED; }
export interface ILogoutAction { readonly type: typeof LOGOUT; }
export interface IRefTokenRequestAction { readonly type: typeof REFRESH_TOKEN_REQUEST; }
export interface IRefTokenSuccessAction { readonly type: typeof REFRESH_TOKEN_SUCCESS; }
export interface IRefTokenFailedAction { readonly type: typeof REFRESH_TOKEN_FAILED; }
export interface IGetUserRequestAction { readonly type: typeof GET_USER_REQUEST; }
export interface IGetUserSuccessAction { readonly type: typeof GET_USER_SUCCESS; }
export interface IGetUserFailedAction { readonly type: typeof GET_USER_FAILED; }



export type TAuthActions =
    | ILoginAction
    | IRegSuccessAction
    | IRegFailedAction
    | ILogoutAction
    | IRefTokenRequestAction
    | IRefTokenSuccessAction
    | IGetUserRequestAction
    | IGetUserFailedAction
    | IGetUserSuccessAction
    | IRefTokenFailedAction;