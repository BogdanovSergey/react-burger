import React, {useState, useContext,useCallback} from 'react';
import css from './index.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderDetails, Portal} from "../portal";
import {ApiDataContext, SetOrderContext} from '../../utils/context';

import * as config from '../../config';
import { BurgerItem } from '../burger-item/burger-item';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import {MOVE_INGREDIENT, INGREDIENT_DELETE, COUNTER_DOWN} from '../../services/actions';

/*  Конструктор - ПРАВЫЙ блок */
export const BurgerConstructor = ({ onDropHandler }) => {
	const dispatch = useDispatch();
    const [modalIsActive, setModalActive] = useState(false);
	const apiData = useContext(ApiDataContext);
    const setOrderObj = useContext(SetOrderContext);
	
	const { bun, contentItems } = useSelector(store => store.burgerIngredients);
    //const bun = apiData.find(item => item.type === 'bun');

    const [{ canDrop, isHover }, dropTarget] = useDrop({
        accept : "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });
	const active = canDrop && isHover;
	let constructorClass = active ? css.column_active : canDrop ? css.constructor_candrop : ''
	let opacity;
	let dropMsgCls;
	if(canDrop) {
		dropMsgCls = css.drop_msg;
		opacity = 0.5;
	} else {
		dropMsgCls = css.no_drop_msg;
		opacity = 1;
	}
	const moveItem = useCallback((dragIdx, idx) => {
		dispatch({
			type: MOVE_INGREDIENT,
			toIndex: idx,
			fromIndex: dragIdx
		})
	}, [dispatch])
	
    const createOrder = function() {
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
	
	const orderSumm = (bun, items) => {
		let summ = (bun)? bun.price*2 : 0
		items.map((itm)=>{summ += itm.price})
		return summ;
	}
	
    return (
        <div className={css.column} ref={dropTarget} style={{opacity}}>
	        <div className={dropMsgCls}>
	            Переместите сюда ингредиент для добавления в заказ
            </div>
	        {bun &&
	        <div className="mb-5">
		        <ConstructorElement
			        text={bun.name+" (Верх)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
		        />
	        </div>
	        }
	        <div className={css.list}>
		        <ul>
		        {contentItems.map((item, i) => {
		        	const delFunc = () => {
					        console.log(item)
					        dispatch({
						        type: INGREDIENT_DELETE,
						        id : item.productId
					        })
					        dispatch({
						        type: COUNTER_DOWN,
						        key: item._id,
						        typeItem: item.type
					        })
				        }
			        return (
					        <BurgerItem
						        key={item.productId}
						        item={item}
						        isLocked={false}
						        deleteFunc={delFunc}
						        moveFunc={moveItem}
						        index={i}
					        />
			        )
		        })
		        }</ul>
	        </div>
	        {bun &&
	        <div className="mb-5">
		        <ConstructorElement
			        text={bun.name+" (Низ)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
		        />
	        </div>
	        }
            <div className={css.total}>
                <p className="text text_type_digits-medium">{orderSumm(bun, contentItems)}</p>
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

/*

{/!*Выделяем верхнюю булку вне скролла*!/}
{(bun)?
    <ConstructorElement
        key={bun._id}
        type="top"
        isLocked={true}
        text={bun.name+" (верх)"}
        price={bun.price}
        thumbnail={bun.image}
    /> : null}

{/!*Содержание булки*!/}
<div className={css.column_list}>
    {apiData.map((itm) => {
            if(itm.type === 'main' || itm.type === 'sauce') {
                orderSumm += itm.price;
                return <ConstructorElement
                    key={RandomKey()}
                    /!*key={itm._id}*!/
                    text={itm.name}
                    price={itm.price}
                    thumbnail={itm.image}
                />
            }
        }
    )}
</div>

{/!*Выделяем нижнюю булку вне скролла*!/}
{(bun)?
    <ConstructorElement
        key={bun._id+'_dub'} /!* сделать random в след спринте*!/
        type="bottom"
        isLocked={true}
        text={bun.name+" (низ)"}
        price={bun.price}
        thumbnail={bun.image}
    /> : null}*/
