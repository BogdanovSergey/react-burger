import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import { Logo, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerAction } from '../../services/actions/auth';
import css from './register.module.css';

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({name:'',email:'',password:''});
    const fieldChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerAction(formData))
            //.then(() => history.replace({ pathname: '/login' }));
        console.log(formData);
    };

    return (
        <>
            <div className={css.reg_box}>
                <Logo />
                <form className={css.reg_fields} onSubmit={handleSubmit}>
                    <h3 className="text text_type_main-medium" >Регистрация</h3>
                    <Input name={'name'} value={formData.name} onChange={fieldChange} type={"text"} placeholder={"Имя"}/>
                    <Input name={'email'} value={formData.email} onChange={fieldChange} type={"email"} placeholder={"E-mail"}/>
                    <PasswordInput onChange={fieldChange} value={formData.password} name={'password'}/>
                    <Button type="primary" size="small">
                        <p className="text text_type_main-default">Зарегистрироваться</p>
                    </Button>
                </form>
            </div>
            <div className={css.reg_text}>
                <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                    <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                </span>
            </div>

        </>)
}
