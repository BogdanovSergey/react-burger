export const apiUrl:string = 'https://norma.nomoreparties.space/api';
export const createOrderUrl:string = apiUrl + '/orders';
export const getIngredientsUrl:string = apiUrl + '/ingredients';
export const pwForgotUrl:string = apiUrl + '/password-reset';
export const pwResetUrl:string = apiUrl + '/password-reset/reset';

export type TObject = {
    loginUrl:string,
    registerUrl:string,
    logoutUrl:string,
    tokenUrl:string,
    userUrl:string
}

export const config:TObject = {
    loginUrl : apiUrl + '/auth/login',
    registerUrl : apiUrl + '/auth/register',
    logoutUrl : apiUrl + '/auth/logout',
    tokenUrl : apiUrl + '/auth/token',
    userUrl : apiUrl + '/auth/user'
}


