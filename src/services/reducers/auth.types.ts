import { TUser } from '../../types'

export type AuthStore = {
    login:boolean,
    authorized:boolean,
    user: TUser,
    getUserRequest:boolean,
    refreshTokenRequest:boolean,
    tokenIsGood:boolean
}