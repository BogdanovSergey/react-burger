import React from 'react';
import {
    Logo, BurgerIcon, ListIcon, ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';

export const AppHeader = () => {
    return (
            <div className={css.side}>
                <div className={css.box1}>
	                {/*
	                SmilingJey:
	                Оберните иконку и текст в ссылку <a href="#">
	                В следующих спринтах вместо ссылки будет компонент Link из библиотеки react router , а пока сделайте просто ссылкой
	                
	                SB:
	                Благодарю за комментарий, в следующем спринте сделаю Link
	                */}
	                <a href="#" className={css.inmenu}>
		                <BurgerIcon type="primary"/>
                        <span className="menuText text text_type_main-default ">Конструктор</span>
	                </a>
	                <a href="#" className={css.inmenu}>
                        <ListIcon type="primary"/>
                        <span className="menuText text text_type_main-default">Лента Заказов</span>
	                </a>
                </div>

                <div className={css.centr}>
                    <a href="#">
                        <Logo/>
                    </a>
                </div>

                <div className={css.box3}>
	                <a href="#" className={css.inmenu}>
                        <ProfileIcon type="primary" />
                        <span className="menuText text text_type_main-default">Личный кабинет</span>
	                </a>
                </div>

            </div>

    );
}

export default AppHeader;