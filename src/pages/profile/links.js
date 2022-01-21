import s from "./profile.module.css"
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import {useDispatch} from 'react-redux';
import {logoutAction} from '../../services/actions/auth';
import {useHistory} from 'react-router-dom';

export function Links() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    let history = useHistory();

    const handleExit = () => {
        let res = dispatch(logoutAction());
        //console.log(res)
        //res && history.replace({ pathname: '/login' }) // как правильно привязать переадресацию к успешному действию? 8-(
    }

    return (
        <nav className={s.nav_list+' pt-5 mb-20'}>

            <NavLink exact to="/profile"
                className={s.link + " text text_type_main-medium text_color_inactive"}
                activeClassName={s.link_active}>
                <span className='ml-2 pu-5 pb-5'>Профиль</span>
            </NavLink>

            <NavLink exact to="/profile/orders"
                className={s.link + " text text_type_main-medium text_color_inactive"}
                activeClassName={s.link_active}>
                <span className='ml-2 pu-5 pb-5'>История заказов</span>
            </NavLink>

            <NavLink exact to="/login"
                     className={s.link + " text text_type_main-medium text_color_inactive"}
                     activeClassName={s.link_active}>
                <span className='ml-2 pu-5 pb-5' onClick={handleExit}>Выход</span>
            </NavLink>

            {pathname === '/profile' ? (
                <div className="pt-20">
                    <span className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
                </div>
            ) : null }
        </nav>
    )
}
