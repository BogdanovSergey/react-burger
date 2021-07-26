import React from 'react';
import {
    Logo, BurgerIcon, ListIcon, ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';

function AppHeader() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={css.app_header}>
            <menu className={css.app_header_in}>

                <div className={css.app_header_row}>
                    <BurgerIcon type="primary" />
                    Конструктор

                    <ListIcon type="primary" />
                    Лента Заказов
                </div>

                <Logo/>
                <div className={css.app_header_row}>
                <ProfileIcon type="primary" />
                    Личный кабинет
                </div>
            </menu>
        </div>
    );
}

export default AppHeader;
