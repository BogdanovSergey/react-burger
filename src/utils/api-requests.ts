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


export const getUserRequest_ = (token:string) => {
    //return fetch(config.userUrl, {
    console.log( 'getUserRequest 1' );
    return fetchWithRefreshToken(config.userUrl,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }
    })
        .then(checkResponse);
};
export const updateUserRequest_ = ({email, name, token}:TUserRequest) => {
    //return fetchWithRefreshToken2(config.userUrl,{
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

export const getUserRequest = (token:string) => {
    //return fetch(config.userUrl, {
    console.log( 'getUserRequest 2' );
    return fetchWithRefreshToken2(()=>{
        return myFetch2(config.userUrl, 'GET', token);
    })//.then(checkResponse);
};

export const updateUserRequest = (params:TUserRequest) => {
    console.log('updateUserRequest')
    return fetchWithRefreshToken2(()=>{
        return myFetch(config.userUrl, 'PATCH', params);
    }).then(checkResponse);
};
const myFetch = (url: string, method:string, params: Record<string, any>|string ) => {
    const authToken = localStorage.getItem('accessToken');
    return fetch(url, {
        method : method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + authToken
        },
        body: JSON.stringify(params)
    })
};
const myFetch2 = (url: string, method:string, authToken: string ) => {
    return fetch(url, {
        method : method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + authToken
        }
    })
};

let cashPr: Promise<void> | null = null;
const fetchWithRefreshToken2 = (callback:()=>Promise<any>) => {
    if (cashPr) {
        return cashPr.then(() => {
            return callback()
        })
    }
    return callback().then((res) => checkResponse(res))
        .catch((res: Response) => {
            return res.json()
                .then((err: TError) => {
                    if (err?.message === 'jwt expired') {
                        console.log('fetchWithRefreshToken');
                        if (!cashPr) {
                            cashPr = refreshTokenRequest()
                                .then(res => {
                                    localStorage.setItem('refreshToken', res.refreshToken);
                                    const authToken = res.accessToken.split('Bearer ')[1];
                                    //delCookie('token')
                                    setCookie('token', authToken);
                                    //(options.headers as { [key: string]: string }).Authorization = res.accessToken;
                                    //myFetch ?
                                })
                        }

                        return cashPr.then(() => {
                            return callback().then((res) => checkResponse(res))
                        });
                    } else {
                        delCookie('token');
                        localStorage.removeItem('refreshToken');
                        // eslint-disable-next-line
                        location.reload();
                        return Promise.reject(err)
                    }
                })
        });

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