import React,{useState,SyntheticEvent} from 'react';
import { Link, useHistory,useLocation } from 'react-router-dom';
import {Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './login.module.css';
import {loginAction} from "../../services/actions/auth";
import {useDispatch} from "react-redux";
//import { ReduxStore } from '../../services/store.types'

export const LoginPage = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const location = useLocation();
    //const userObj = useSelector<ReduxStore>(store => store.auth.user);
    const [state, setState] = useState({
        email:'',
        password:''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };

/*    type TResponse = {
        success: boolean
        user: {
            email:string
            name: string
        }
    } & Response*/

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginAction(state) as any)
            .then(() => {
                console.log(location.state?.from?.pathname || '/')
                history.replace({ pathname: location.state?.from?.pathname || '/' })
            });
    };

    return (
        <>
            <div className={css.login_box}>
                <Logo/>
                <form className={css.login_fields} onSubmit={handleSubmit}>
                    <h3 className="text text_type_main-medium">Вход</h3>
                    <Input
                        type={"email"}
                        placeholder={"E-mail"}
                        onChange={handleChange}
                        name={"email"}
                        value={state.email}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        size={"default"}
                        onChange={handleChange}
                        name={"password"}
                        value={state.password}
                    />
                    {/*<PasswordInput />*/}
                    <Button type="primary" size="small">
                        <p className="text text_type_main-default">Войти</p>
                    </Button>
                </form>
                <div className={css.login_text}>
                <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь?
                    <Link to="/register" className="text text_type_main-default pl-2">Зарегистрироваться</Link>
                </span>
                    <br/>
                    <span className="text text_type_main-default text_color_inactive">Забыли пароль?
                    <Link to="/forgot-password"
                          className="text text_type_main-default pl-2">Восстановить пароль</Link>
                </span>
                </div>
            </div>

        </>);

}
