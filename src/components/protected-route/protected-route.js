import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { refreshTokenAction } from '../../services/actions/auth'
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({ children, ...rest }) => {
    const authorized = useSelector(store=>store.auth.authorized);
    const location = useLocation();

    if (authorized) {
        return (
            <Route {...rest}>
                {children}
            </Route>
        )
    } else {
        return (<Redirect
            to={{
                pathname: '/login',
                state: {from: location}
            }}
        />)

    }
}
