import { TUser} from '../../types'
import {
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN,
    LOGOUT, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from "../actions/auth";

export type AuthStore = {
    login:boolean,
    authorized:boolean,
    user: TUser,
    getUserRequest:boolean,
    refreshTokenRequest:boolean,
    tokenIsGood:boolean
}

export type RegSuccessAction = { type: typeof REGISTER_SUCCESS }
export type RegFailedAction = { type: typeof REGISTER_FAILED }
export type LoginAction = { type: typeof LOGIN, user:TUser }
export type LogoutAction = { type: typeof LOGOUT }
export type UserReqAction = { type: typeof GET_USER_REQUEST }
export type UserSuccessAction = { type: typeof GET_USER_SUCCESS, user:TUser }
export type UserFailedAction = { type: typeof GET_USER_FAILED }
export type TokenRequestAction = { type: typeof REFRESH_TOKEN_REQUEST }
export type TokenSuccessAction = { type: typeof REFRESH_TOKEN_SUCCESS }
export type TokenFailedAction = { type: typeof REFRESH_TOKEN_FAILED}

export type AuthActions =
    | RegSuccessAction
    | RegFailedAction
    | LoginAction
    | LogoutAction
    | UserReqAction
    | UserSuccessAction
    | UserFailedAction
    | TokenRequestAction
    | TokenSuccessAction
    | TokenFailedAction

