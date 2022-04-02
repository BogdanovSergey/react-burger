import * as config from '../../config';
import {ORDER_LOAD, RESET_CONSTRUCTOR,GET_ORDER,GET_ORDER_SUCCESS,GET_ORDER_FAILED} from "./index";
import {Dispatch} from "redux";
import {TIngredient, TOrder} from "../../types";
import {OrderActions,TGetOrderResponse} from "../reducers/order.types"
import {getCookie} from "../../utils/cookie";

export interface IGetIngredientsAction {
	type?: TIngredient[]
	ingredientsIdsArr: string[]
	//readonly type: typeof INGREDIENTS_LOAD;
}

export const createOrder = (ingredientsIdsArr : string[]) =>{
	return function (dispatch:Dispatch) {

		fetch(config.createOrderUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': 'Bearer '+getCookie('token')
				},
				body: JSON.stringify({'ingredients': ingredientsIdsArr})
			}
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
					dispatch({
						type: ORDER_LOAD,
						number: orderNumber
					})
					dispatch({
						type:RESET_CONSTRUCTOR
					});
				}
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});
	}
}

export function getOrder (id: string) {
	return function(dispatch: Dispatch<OrderActions>) {
		dispatch({type: GET_ORDER});

		fetch(config.orderUrl + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response.status);
			}
		})
		.then((response:any) => {
			console.log(response);
			dispatch({
				type: GET_ORDER_SUCCESS,
				order: response.orders[0]
			});
			return response.data;

		})
		.catch(() => {
			console.log('errr');
			dispatch({
				type: GET_ORDER_FAILED
			})
		})

	}
}