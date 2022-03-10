import React, { FC } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux';
import {ReduxStore} from "../../services/store.types";
interface Props {
    path?:string
}

export const ProtectedRoute: FC<Props> = ({ children, ...rest }: React.PropsWithChildren<{ [key: string]: any }>) => {
    const authorized = useSelector((store:ReduxStore)=>store.auth.authorized);
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
