import React, { FC } from 'react';
import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';
import {useSelector} from '../../hooks/hooks'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const authorized = useSelector(store => store.auth.authorized);
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
};
