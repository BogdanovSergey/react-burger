import React from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';


function BurgerConstructor() {
    const bunUp = data.find(item => item._id === '60666c42cc7b410027a1a9b1');
    const bunDown = data.find(item => item._id === '60666c42cc7b410027a1a9b1');
    return (
        <div className={css.column}>
            <div className={css.header_box}/>

            {/*Выделяем верхнюю булку вне скролла*/}
            {(bunUp)?
                <ConstructorElement
                    key={bunUp._id}
                    type="top"
                    isLocked={true}
                    text={bunUp.name+" (верх)"}
                    price={bunUp.price}
                    thumbnail={bunUp.image}
                /> : null}

            {/*Содержание булки*/}
            <div className={css.column_list}>
                {data.map((itm) => {
                    return (itm.type === 'main' || itm.type === 'sauce') ?
                        <ConstructorElement
                            key={itm._id}
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        /> : null}
                    )
                }
            </div>

            {/*Выделяем нижнюю булку вне скролла*/}
            {(bunDown)?
                <ConstructorElement
                    key={bunDown._id}
                    type="bottom"
                    isLocked={true}
                    text={bunDown.name+" (низ)"}
                    price={bunDown.price}
                    thumbnail={bunDown.image}
                /> : null}

            <div className={css.total}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="medium">Оформить заказ</Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;
