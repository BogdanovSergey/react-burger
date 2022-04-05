import React, {SyntheticEvent} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './reset-password.module.css';
import * as config from "../../config";
import {useSelector} from '../../hooks/hooks'
import {checkResponse} from "../../utils/api-requests";

export const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');
    const authorized = useSelector(store => store.auth.authorized);
    let history = useHistory();
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        fetch(config.pwResetUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'password': password, 'token':token})
        })
            .then(checkResponse)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
                alert('Error ' + error + ' while connecting to Api');
            });
    }

    if(authorized) {
        history.replace({ pathname: '/' });
        return null;
    } else {
        return (
            <>
                <div className={css.login_box}>
                    <Logo/>
                    <form className={css.login_fields} onSubmit={handleSubmit}>
                        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
                        <Input type={"password"} placeholder={"Введите новый пароль"} value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                        <Input type={"text"} placeholder={"Введите код из письма"} value={token}
                               onChange={(event) => setToken(event.target.value)}/>

                        <Button type="primary" size="small">
                            <p className="text text_type_main-default">Сохранить</p>
                        </Button>
                    </form>
                    <div className={css.login_text}>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                        <Link to="/register" className="text text_type_main-default pl-2">Войти</Link>
                    </span>
                    </div>
                </div>
            </>);
    }
}
