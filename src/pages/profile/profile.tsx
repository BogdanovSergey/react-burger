import React,{useEffect, SyntheticEvent} from "react";
import { Route, Switch} from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./profile.module.css";
import {Links} from "./links";
import {useDispatch, useSelector} from "react-redux"
import { TUser } from '../../types'
import { getUserAction,updateUserAction} from "../../services/actions/auth";
import {ReduxStore} from "../../services/store.types";
import {ProtectedRoute} from '../../components/protected-route';
import {Orders} from '../../components/orders/orders';
export const ProfilePage = () => {
    const dispatch = useDispatch();
    const emptyState:TUser = {
        name    : "",
        email   : "",
        password: ""
    };
    const [defaultState, setDefaultState] = React.useState(emptyState);
    const [state, setState] = React.useState(emptyState);
    const  user:TUser  = useSelector((store:ReduxStore) => store.auth.user);

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const target = e.target;
        setState({
            ...state,
            [ target.name]: target.value
        });
    };
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateUserAction(state))
    };
    const handleReset = (e: SyntheticEvent) => {
        e.preventDefault();
        setState(defaultState);
    };

    useEffect(()=>{
        setState(user);
        setDefaultState({
            ...user,
            ...{password:''}
        });
    },[user]);

    useEffect(()=>{
        dispatch(getUserAction())
    },[]);

    return(
        <>
            <div className={css.profile_main+" pt-20"} >
                <div className={css.profile_col}>
                    <Links/>
                </div>
                <div className={css.profile_col}>
                    <Switch>
                        <Route path="/profile" exact={true}>
                            <form className={css.profile_form} onSubmit={handleSubmit}>
                                <Input
                                    type={"text"}
                                    placeholder={"Имя"}
                                    onChange={handleInputChange}
                                    icon={"EditIcon"}
                                    value={state.name||''}
                                    name={"name"}
                                    size={"default"}
                                />
                                <Input
                                    type={"text"}
                                    placeholder={"Email"}
                                    onChange={handleInputChange}
                                    icon={"EditIcon"}
                                    name={"email"}
                                    value={state.email}

                                />
                                <Input
                                    type={"password"}
                                    placeholder={"Пароль"}
                                    onChange={handleInputChange}
                                    icon={"EditIcon"}
                                    name={"password"}
                                    value={state.password||''}
                                    size={"default"}
                                />
                                <Button type="primary" size="small" >
                                    <p className="text text_type_main-default">Сохранить</p>
                                </Button>
                                <Button type="secondary" size="small" onClick={handleReset}>
                                    <p className="text text_type_main-default">Отмена</p>
                                </Button>
                            </form>
                        </Route>
                        <ProtectedRoute path="/profile/orders" exact={true}>
                            <Orders/>
                        </ProtectedRoute>
                    </Switch>
                </div>
            </div>
        </>);

}
