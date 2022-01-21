import React,{useEffect} from "react";
import {AppHeader} from "../../components/app-header";
import {NavLink, Route, Switch, Link,useLocation,useHistory} from "react-router-dom";
import {Logo, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./profile.module.css";
import {Links} from "./links";
import {useDispatch, useSelector} from "react-redux"
import {registerRequest} from "../../utils/api-requests";
import {getCookie} from "../../utils/cookie";
import {registerAction, getUserAction,updateUserAction} from "../../services/actions/auth";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const emptyState = {
        name    : "",
        email   : "",
        password: ""
    }
    const [defaultState, setDefaultState] = React.useState(emptyState);
    const [state, setState] = React.useState(emptyState);
    const { user } = useSelector(store => store.auth);

    const handleInputChange = (e) => {
        const target = e.target;
        setState({
            ...state,
            [ target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserAction(state))

    }
    const handleReset = (e) => {
        e.preventDefault();
        setState(defaultState);
    }

    useEffect(()=>{
        console.log(user)
        let user2 = {
            ...user,
            ...{password:'123'}
        }
        setState(user2);
    },[user]);

    useEffect(()=>{
        if(!getCookie('token') || !localStorage.getItem('refreshToken')) {
            //alert(2);
            history.replace({ pathname: '/login' })
            // TODO при ошибке не перенаправлять.
        } else {
            let response = dispatch(getUserAction())
            console.log(response);

            console.log(user);
            setDefaultState(user);

        }
    },[dispatch]);

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
                                    className="pt-5 pb-20"
                                    onChange={handleInputChange}
                                    icon={"EditIcon"}
                                    value={state.name}
                                    name={"name"}
                                    size={"default"}
                                />
                                <Input
                                    type={"text"}
                                    placeholder={"Email"}
                                    className="pt-5 pb-5"
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
                                    value={state.password}
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
                    </Switch>
                </div>
            </div>
        </>);

}
