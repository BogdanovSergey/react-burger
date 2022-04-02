import React, { useState} from 'react';
import css from './product.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal";
import {IngredientDetails} from "../ingredient-details";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import { TIngredient } from '../../types'
import  { ReduxStore } from '../../services/store.types';
import {Route, useHistory} from "react-router";
//import { BurgerIngredientStore } from '../../services/reducers/burger-ingredient.types'

export const Product = (props:{apiData:TIngredient}) => {
    const history = useHistory();
    const [modalIsActive, setModalActive] = useState(false);
	const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: props.apiData,
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	});

    const onClose = (e: Event) => {
        if(e) e.stopPropagation();
        setModalActive(false);
        history.goBack()
    }

	const opacity = isDrag ? 0.5 : 1;
    const { counts, bun } = useSelector((store:ReduxStore) => store.ingr.burgerIngredients);

	let count = (counts && typeof(counts[props.apiData._id]) !== 'undefined') ? counts[props.apiData._id] : 0;
	count = (props.apiData.type==='bun' && count && props.apiData._id === bun._id) ? 2 : (props.apiData.type==='bun' ? 0 : count);
    const productContent =
        <div className={css.product} onClick={()=>setModalActive(true)} ref={dragRef} style={{ opacity }}>
            <img src={props.apiData.image} alt={props.apiData.name}/>
            <span className={css.inn_flex}>
                <span className="mr-3">{props.apiData.price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span className="text text_type_main-small">
               {props.apiData.name}
           </span>
	        { count > 0 && <Counter count={count} size="default"/>}
        </div>

    return (
        <div>
            {productContent}
            {modalIsActive && <Modal header="Детали ингредиента" setModalActive={setModalActive} onClose={onClose}>
	            <IngredientDetails/>
            </Modal>
            }
        </div>
    );
}
