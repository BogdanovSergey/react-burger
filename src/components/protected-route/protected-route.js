import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { refreshTokenAction } from '../../services/actions/auth'
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const lsToken = localStorage.getItem('refreshToken');
    const cooToken = getCookie('token')

    useEffect(() => {
        dispatch(refreshTokenAction())
    }, [lsToken, cooToken]);

    return (
        <Route
            {...rest}
            render={({location}) =>
                (lsToken && cooToken) ? ( children ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
