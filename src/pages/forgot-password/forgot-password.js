import React, {useEffect} from 'react';
import {AppHeader} from '../../components/app-header';
import { Link, useHistory } from 'react-router-dom';
import {Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './forgot-password.module.css';
import * as config from "../../config";
import {getCookie} from "../../utils/cookie";



export const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState('');
    let history = useHistory();
    const handleOnClick = (e) => {
        e.preventDefault();
        fetch(config.pwForgotUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'email': email})
        })
            .then(response => {
                if (response.ok) {
                    history.replace({ pathname: '/reset-password' });
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            })
            .then(result => {
                console.log(result)

            })
            .catch(error => {
                console.log(error);
                alert('Error ' + error + ' while connecting to Api');
            });
    }

    useEffect(()=>{
        if(localStorage.getItem('refreshToken') || getCookie('token')) {
            history.replace({ pathname: '/' })
        }
    },[]);

    return(
        <>
            <div className={css.login_box}>
                <Logo />
                <form className={css.login_fields}>
                    <h3 className="text text_type_main-medium">Восстановление пароля</h3>
                    <Input type={"email"} placeholder={"Укажите e-mail"} onChange={(event)=>setEmail(event.target.value)} value={email}/>
                    <Button type="primary" size="small" onClick={handleOnClick}>
                        <p className="text text_type_main-default">Восстановить</p>
                    </Button>
                </form>
                <div className={css.login_text}>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                        <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                    </span>
                </div>
            </div>



        </>);

}
