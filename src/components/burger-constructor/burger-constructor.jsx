import React, {useState, useContext} from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderDetails, Portal} from "../portal";
import {ApiDataContext, SetOrderContext} from '../../utils/context';
import {RandomKey} from '../../utils/random-key';
import * as config from '../../config';

/*  Конструктор - ПРАВЫЙ блок */
export const BurgerConstructor = () => {
    const [modalIsActive, setModalActive] = useState(false);
	const apiData = useContext(ApiDataContext);
    const setOrderObj = useContext(SetOrderContext);
    const bun = apiData.find(item => item.type === 'bun');
    let orderSumm = 0;

    let createOrder = function() {
        let ingredientsArr = [];
        for(let itm of apiData) {ingredientsArr.push(itm._id) }

        fetch(config.createOrderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'ingredients':ingredientsArr})}
            )
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            })
            .then(result => {
                if (result.success) {
                    let orderNumber = result.order.number;
                    setOrderObj({number:orderNumber})
                    setModalActive(true);
                }
            })
            .catch(error => {
                console.log(error);
                alert('Error ' + error + ' while connecting to Api');
            });

    }

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
                {apiData.map((itm) => {
                    if(itm.type === 'main' || itm.type === 'sauce') {
                        orderSumm += itm.price;
                        return <ConstructorElement
                            key={RandomKey()}
                            /*key={itm._id}*/
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        />
                    }
                }
                )}
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
                <p className="text text_type_digits-medium">{orderSumm}</p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="medium" onClick={createOrder}>Оформить заказ</Button>
                {modalIsActive && <Portal setModalActive={setModalActive}>
	                <OrderDetails/>
                </Portal>}
            </div>
        </div>
    );
}

export default BurgerConstructor;
