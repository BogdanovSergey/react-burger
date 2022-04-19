import React from 'react';
import css from './modal.module.css';
import { useSelector } from '../../hooks/hooks';

export const OrderDetails = () => {
	const orderObj = useSelector((store) => store.order) || null;

	if(orderObj && orderObj.number ) {
		return (
			<div className={css.order_details}>
				<p className="text text_type_digits-large">{orderObj.number}</p>
				<p className={css.identificator_size + " text text_type_main-medium"}>идентификатор заказа</p>
				<div className={css.done_btn}></div>
				<span className={css.bottom_text + " pt-7 text text_type_main-small"}>
						<p>Ваш заказ начали готовить</p>
						<p>Дождитесь готовности на орбитальной станции</p>
					</span>
			</div>
		)
	} else {
		return (
			<div className={css.order_details}>
				<span className={css.bottom_text + " mt-10 text text_type_main-small"}>
						<p>Секундочку... оформляем Ваш заказ...</p>
					</span>
			</div>
		)
	}
}