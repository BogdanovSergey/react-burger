import React, {useState} from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';
import {OrderDetails, Portal} from "../portal";

export const BurgerConstructor = () => {
    const [modalIsActive, setModalActive] = useState(false);
    const bun = data.find(item => item._id === '60666c42cc7b410027a1a9b1');
    //const bunDown = data.find(item => item._id === '60666c42cc7b410027a1a9b2');
    /* убираю нижнюю булку по просьбе SmilingJey (5 days ago):
    "по заданию следующего спринта должны быть одинаковые булки сверху и снизу, не нужно делать bunUp и bunDown , достаточно одной bun" */
    return (
        <div className={css.column}>
            <div className={css.header_box}/>

            {/*Выделяем верхнюю булку вне скролла*/}
            {(bun)?
                <ConstructorElement
                    key={bun._id}
                    type="top"
                    isLocked={true}
                    text={bun.name+" (верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                /> : null}

            {/*Содержание булки*/}
            <div className={css.column_list}>
                {data.map((itm) => {
                    return (itm.type === 'main' || itm.type === 'sauce') ?
                        <ConstructorElement
                            key={itm._id}
                            /* SmilingJey:
                            в бургере может быть несколько одинаковых ингредиентов, поэтому нельзя использовать _id ингредиента для key.
                            Обратите на это внимание в следующем спринте, при добавлении ингредиента в бургер нужно будет генерировать
                            уникальный id и добавлять его объекту ингредиента конструктора, что бы использовать как key
                            */
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        /> : null}
                    )
                }
            </div>

            {/*Выделяем нижнюю булку вне скролла*/}
            {(bun)?
                <ConstructorElement
                    key={bun._id+'_dub'} /* сделать random в след спринте*/
                    type="bottom"
                    isLocked={true}
                    text={bun.name+" (низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                /> : null}

            <div className={css.total}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="medium" onClick={()=>setModalActive(true)}>Оформить заказ</Button>

                {modalIsActive && <Portal setModalActive={setModalActive}>
	                <OrderDetails/>
                </Portal>}
            </div>
        </div>
    );
}

export default BurgerConstructor;
