import React from 'react';
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';

function AppHeader() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={css.app_header}>
            <menu className={css.app_header_in}>


                {/*<Button type="primary" size="large"><CurrencyIcon type="primary"/>Конструктор</Button>*/}

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
            </menu>
        </div>
    );
}

export default AppHeader;
