import {config} from '../config';
import {getCookie} from "./cookie";

export const registerRequest = ({ email, password, name }) => {
    return fetch(config.registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password, name})
        }
    )
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
};

export const loginRequest = ({ email, password }) => {
    return fetch(config.loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
};


export const getUserRequest = (token) => {
    return fetch(config.userUrl, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        });
};
export const updateUserRequest = (email, name, token) => {
    return fetch(config.userUrl, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({email, name})
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        });
};