import React from 'react';
import css from './portal.module.css';
import imgDone from '../../images/done.svg';

export const OrderDetails = () => {
	return(
		<div className={css.order_details}>

			<p className="text text_type_digits-medium">1234567890</p>
			
			<p className="text text_type_main-small">идентификатор заказа</p>
			
			<img src={imgDone} alt={"done"}/>
			
			<p className="text text_type_main-small">Ваш заказ начали готовить фыва as fdasd fasd fasdf asd fa ыва фыва  saf</p><br/>
			
			<p className="text text_type_main-small">Дождитесь готовности на орбитальной станции</p>
			
			
		</div>
	);
}