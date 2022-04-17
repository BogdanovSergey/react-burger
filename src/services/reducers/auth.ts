import {
    LOGIN,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from '../actions/auth';
import {getCookie} from "../../utils/cookie";
import {AuthActions, AuthStore} from "./auth.types";

const initialState:AuthStore =
    {
        login: false, // ???
        authorized : !!getCookie('token'),
        //authorized:false,
        user: {
            name:'',
            email:'',
            password:''
        },
        getUserRequest:false,
        refreshTokenRequest:false,
        tokenIsGood:false
};

export const authReducer = (state = initialState, action:AuthActions):AuthStore => {
    switch (action.type) {

        case REGISTER_SUCCESS: {
            //const userObj = action.user;
            return {
                ...state
            };
        }
        case REGISTER_FAILED:{
            return {
                ...state
            };
        }

        case LOGIN: {
            return {
                ...state,
                login: true,
                authorized : true,
                user: {
                    ...state.user,
                    name : action?.user?.name,
                    email: action?.user?.email
                }
            };
        }
        case LOGOUT: {
            return {
                ...state,
                login: false,
                authorized : false,
                user: {
                    name : '',
                    email: '',
                    password : ''
                }
            };
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest : true,
                user: {
                    ...state.user
                }
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest : false,
                authorized : true,
                user: {
                    name : action?.user?.name,
                    email: action?.user?.email,
                    password:''
                }
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest : false,
                authorized: false,
                user: {
                    name : '',
                    email: '',
                    password:''
                }
            }
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
                tokenIsGood : false
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                authorized : true,
                refreshTokenRequest: false,
                tokenIsGood : true
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                authorized : false,
                refreshTokenRequest: false,
                tokenIsGood : false
            }
        }

        default: {
            return state;
        }
    }
}
