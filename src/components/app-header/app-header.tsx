import React from 'react';
import {
    Logo, BurgerIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export const AppHeader = () => {
    const { pathname } = useLocation();
    return (
        <nav>
            <div className={css.side}>
                    <div className={css.box1}>
                            <NavLink exact to='/' className={css.inmenu}>
                                <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                                <span className=" text text_type_main-default ">Конструктор</span>
                            </NavLink>

                            <NavLink exact to='/feed' className={css.inmenu}>
                                <BurgerIcon type={pathname === '/feed' ? "primary" : "secondary"} />
                                <span className=" text text_type_main-default ">Лента Заказов</span>
                            </NavLink>
                    </div>

                    <div className={css.centr}>
                        <NavLink exact to='/' className={css.inmenu_logo}>
                            <Logo/>
                        </NavLink>
                    </div>

                    <div className={css.box3}>
                        <NavLink exact to='/profile' className={css.inmenu}>
                            <BurgerIcon type={pathname === '/profile' ? "primary" : "secondary"} />
                            <span className="text text_type_main-default ">Личный кабинет</span>
                        </NavLink>
                    </div>

            </div>
        </nav>
    );
}

export default AppHeader;