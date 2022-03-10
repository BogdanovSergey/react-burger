import React from 'react';
import css from './modal.module.css';
import imgDone from '../../images/done.svg';
import {useSelector} from "react-redux";
import type { ReduxStore } from '../../services/store.types';

export const OrderDetails = () => {
	const orderObj = useSelector((store:ReduxStore) => store.order);
	
	return(
		<div className={css.order_details}>
			<p className="text text_type_digits-large">{orderObj.number}</p>

			<p className="text text_type_main-medium" style={{padding:'15px',paddingBottom:'40px'}}>идентификатор заказа</p>
			
			<img src={imgDone} alt={"done"}/>
			
			<p className="text text_type_main-medium" style={{fontSize: '14px',padding:'15px',paddingTop:'40px'}}>Ваш заказ начали готовить</p>
			
			<p className="text text_type_main-medium" style={{fontSize: '14px'}}>Дождитесь готовности на орбитальной станции</p>

		</div>
	);
}