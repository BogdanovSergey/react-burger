import s from "./profile.module.css"
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import {useDispatch} from '../../hooks/hooks';
import {logoutAction} from '../../services/actions/auth';

export function Links() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    //let history = useHistory();

    const handleExit = () => {
        //let res = dispatch(logoutAction());
        dispatch(logoutAction());
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

            <div className="pt-20">
                <p className="text text_type_main-default text_color_inactive">В этом разделе Вы можете</p>
                {pathname === '/profile' && (
                    <p className="text text_type_main-default text_color_inactive">изменить свои персональные данные</p>
                ) }
                {pathname === '/profile/orders' && (
                    <p className="text text_type_main-default text_color_inactive">просмотреть свою историю заказов</p>
                ) }
            </div>


        </nav>
    )
}
