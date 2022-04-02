export const protHttp:string = 'https://';
export const protWss:string = 'wss://';
export const domain:string = 'norma.nomoreparties.space';
export const apiUrl:string = domain + '/api';
export const createOrderUrl:string = protHttp + apiUrl + '/orders';
export const orderUrl:string = protHttp + apiUrl + '/orders/';
export const getIngredientsUrl:string = protHttp + apiUrl + '/ingredients';
export const pwForgotUrl:string = protHttp + apiUrl + '/password-reset';
export const pwResetUrl:string = protHttp + apiUrl + '/password-reset/reset';


export type TObject = {
    loginUrl : string,
    registerUrl : string,
    logoutUrl : string,
    tokenUrl : string,
    userUrl : string,
    feedsUrl : string,
    feedsUserUrl : string
}

export const config:TObject = {
    loginUrl : protHttp + apiUrl + '/auth/login',
    registerUrl : protHttp + apiUrl + '/auth/register',
    logoutUrl : protHttp + apiUrl + '/auth/logout',
    tokenUrl : protHttp + apiUrl + '/auth/token',
    userUrl : protHttp + apiUrl + '/auth/user',

    feedsUrl : protWss + domain + '/orders/all',
    feedsUserUrl : protWss + domain + '/orders?token='
}


