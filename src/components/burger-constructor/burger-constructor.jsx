import React, {useState, useContext} from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderDetails, Portal} from "../portal";
import {ApiDataContext,OrderContext} from '../../utils/context';
import {RandomKey} from '../../utils/random-key';
import * as config from '../../config';

/*  Конструктор - ПРАВЫЙ блок */
export const BurgerConstructor = () => {
    const [modalIsActive, setModalActive] = useState(false);
	const apiData = useContext(ApiDataContext);
    const orderObj = useContext(OrderContext); // TODO .....................
    const bun = apiData.find(item => item.type === 'bun');
    let orderSumm = 0;

    let createOrder = function() {
        let ingredientsArr = {'ingredients':['60d3b41abdacab0026a733c6','60d3b41abdacab0026a733cf']};
        fetch(config.createOrderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(ingredientsArr)}
            )
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result.order.number);
                    setModalActive(true);
                }
            })
            .catch(error => {
                console.log(error);
                alert('Error connecting to Api');
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
                {/*    onClick={()=>setModalActive(true)}   */}
                {modalIsActive && <Portal setModalActive={setModalActive}>
	                <OrderDetails/>
                </Portal>}
            </div>
        </div>
    );
}

export default BurgerConstructor;
