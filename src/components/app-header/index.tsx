import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';

function AppHeader() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={css.app_header}>
            <div className={css.app_header_in}>

                <div>
                    <BurgerIcon type="primary" />
    Конструктор

                <ListIcon type="primary" />
    Лента Заказов
                </div>

                <Logo/>
                <div>
                <ProfileIcon type="primary" />
    Личный кабинет
                </div>
            </div>
        </div>
    );
}

export default AppHeader;
