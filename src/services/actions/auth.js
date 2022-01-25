import {
    registerRequest,
    loginRequest,
    refreshTokenRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest} from '../../utils/api-requests';
import {setCookie, delCookie, getCookie} from "../../utils/cookie";
//import {useHistory} from "react-router-dom";
export const LOGIN = 'LOGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const GET_USER = 'GET_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const registerAction = (state) => {
    return function (dispatch) {
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

export function  loginAction (state) {
    return function (dispatch) {
        /*dispatch({
            type: LOGIN,
        });*/
        return loginRequest(state)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    setCookie('token', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: LOGIN,
                        user: res.user,
                    });
                    return res;
                } else {
                    console.error(res.message)
                    return {m:'m1'};
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    };
};

export const refreshTokenAction = () => {
    return function (dispatch) {
        refreshTokenRequest()
            .then((res) => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken);
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                dispatch({
                    type: REFRESH_TOKEN,
                });
            }
        })
        .catch((err) => {
            console.error('Error: ', err);
        });
    };
}

export const logoutAction = () => {
    return function (dispatch) {
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

export const getUserAction = () => {
    return function (dispatch) {
        getUserRequest(getCookie('token'))
            .then((res) => {
                console.log(res)
                if (res && res.success) {
                    dispatch({
                        type: GET_USER,
                        user: res.user,
                    });
                    return res.user;
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    };
};
export const updateUserAction = (state) => {
    return function (dispatch) {
        updateUserRequest(state.email, state.name, getCookie('token'))
            .then((res) => {
                if (res && res.success) {
                    //const authToken = res.accessToken.split('Bearer ')[1];
                    //const refreshToken = res.refreshToken;

                    //setCookie('token', authToken);
                    //localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: UPDATE_USER_FAILED,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_USER_FAILED,
                });
            });
    }
}

