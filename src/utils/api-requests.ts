import {config} from '../config';
import {TUser,TUserRequest,TError} from '../types'
import {setCookie,delCookie} from '../utils/cookie';



export const checkResponse = (response: Response ) => {
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
    //return fetch(config.userUrl, {
    return fetchWithRefreshToken(config.userUrl,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }
    })
        .then(checkResponse);
};
export const updateUserRequest = ({email, name, token}:TUserRequest) => {
    return fetchWithRefreshToken(config.userUrl,{
    //return fetch(config.userUrl, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({email, name})
    })
        .then(checkResponse);
};


let cashPr: Promise<void> | null = null;
const fetchWithRefreshToken2 = (url: string, options: RequestInit) => {

    if (cashPr) { // если есть кеш то сразу вызываем нужный метод
        return cashPr.then(() => {
            // вызов метода callback

        })
    }
    // если кеша нет то создаем его
    // fetch для обновления токена
    cashPr = fetchWithRefreshToken(url, options);

    return cashPr.then(() => {
        // вызов метода callback
    })


    return fetch(url, options).then((res) => checkResponse(res))
        .catch((res: Response) => {
            return res.json()
                .then((err: TError) => {
                    if (err?.message === 'jwt expired') {
                        console.log('fetchWithRefreshToken');
                        return refreshTokenRequest()
                            .then(res => {
                                localStorage.setItem('refreshToken', res.refreshToken);
                                const authToken = res.accessToken.split('Bearer ')[1];
                                //delCookie('token')
                                setCookie('token', authToken);
                                (options.headers as { [key: string]: string }).Authorization = res.accessToken;
                                return fetch(url, options).then((res) => checkResponse(res))
                            })
                    } else {
                        delCookie('token');
                        localStorage.removeItem('refreshToken');
                        // eslint-disable-next-line
                        location.reload();
                        return Promise.reject(err)
                    }
                })
        })

};


const fetchWithRefreshToken = (url: string, options: RequestInit) => {
    return fetch(url, options).then((res) => checkResponse(res))
        .catch((res: Response) => {
            return res.json()
                .then((err: TError) => {
                    if (err?.message === 'jwt expired') {
                        console.log('fetchWithRefreshToken');
                        return refreshTokenRequest()
                            .then(res => {
                                localStorage.setItem('refreshToken', res.refreshToken);
                                const authToken = res.accessToken.split('Bearer ')[1];
                                //delCookie('token')
                                setCookie('token', authToken);
                                (options.headers as { [key: string]: string }).Authorization = res.accessToken;
                                return fetch(url, options).then((res) => checkResponse(res))
                            })
                    } else {
                        delCookie('token');
                        localStorage.removeItem('refreshToken');
                        // eslint-disable-next-line
                        location.reload();
                        return Promise.reject(err)
                    }
                })
        })
};