import {config} from '../config';
import {TUser,TUserRequest} from '../types'

export const checkResponse = (response: Response) => {
    return (response.ok) ? response.json() : Promise.reject(response.status);
};

export const registerRequest = ({ email, password, name }:TUser) => {
    return fetch(config.registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password, name})
        }
    )
    .then(checkResponse);
};

export const loginRequest = ({ email, password }:TUser) => {
    return fetch(config.loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password }),
    })
    .then( checkResponse );
};

export const refreshTokenRequest = () => {
    return fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token : localStorage.getItem('refreshToken')
        }),
    })
    .then(checkResponse);
};

export const logoutRequest = () => {
    return fetch(config.logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
    })
    .then(checkResponse);
};


export const getUserRequest = (token:string) => {
    return fetch(config.userUrl, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }
    })
        .then(checkResponse);
};
export const updateUserRequest = ({email, name, token}:TUserRequest) => {
    return fetch(config.userUrl, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({email, name})
    })
        .then(checkResponse);
};