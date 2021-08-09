import React from 'react';
import css from './portal.module.css';
import imgDone from '../../images/done.svg';
import * as config from '../../config';

export const OrderDetails = () => {
	return(
		<div className={css.order_details}>

			<p className="text text_type_digits-medium">{config.testOrderNo}</p>
			
			<p className="text text_type_main-small" style={{padding:'15px'}}>идентификатор заказа</p>
			
			<img src={imgDone} alt={"done"}/>
			
			<p className="text text_type_main-small" style={{fontSize: '10px',padding:'15px'}}>Ваш заказ начали готовить</p>
			
			<p className="text text_type_main-small" style={{fontSize: '10px'}}>Дождитесь готовности на орбитальной станции</p>

		</div>
	);
}