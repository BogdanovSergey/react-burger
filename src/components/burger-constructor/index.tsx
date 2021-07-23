import React from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';
import Product from "../product";

function BurgerConstructor() {
    const bunUp = data.find(item => item._id === '60666c42cc7b410027a1a9b1');
    const bunDown = data.find(item => item._id === '60666c42cc7b410027a1a9b2');
    return (
        <div className={css.column}>
            <div className={css.header_box}/>
            <div className={css.column_list}>
                {(bunUp)?
                    <ConstructorElement
                        key={bunUp._id}
                        type="top"
                        isLocked={true}
                        text={bunUp.name}
                        price={bunUp.price}
                        thumbnail={bunUp.image}
                    /> : null}
                {data.map((itm) => {
                    return (itm.type === 'main' || itm.type === 'sauce') ?
                        <ConstructorElement
                            key={itm._id}
                            isLocked={true}
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        /> : null}
                    )
                }
                {(bunDown)?
                    <ConstructorElement
                        key={bunDown._id}
                        type="bottom"
                        isLocked={true}
                        text={bunDown.name}
                        price={bunDown.price}
                        thumbnail={bunDown.image}
                    /> : null}
            </div>

            <div className={css.total}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;
