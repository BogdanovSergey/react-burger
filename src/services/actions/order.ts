import * as config from '../../config';
import {ORDER_LOAD, RESET_CONSTRUCTOR, GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER} from "./index";
import {AppDispatch as Dispatch, AppThunk} from '../../types';
import {getCookie} from "../../utils/cookie";
import {checkResponse} from "../../utils/api-requests";

export const createOrder:AppThunk = (ingredientsIdsArr : string[]) =>{
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
			.then(checkResponse)
			.then(result => {
				if (result.success) {
					let orderNumber = result.order.number;
					dispatch({
						type: ORDER_LOAD,
						number: orderNumber
					});
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

export const getOrder:AppThunk = (id: string) => {
	return function(dispatch: Dispatch) {
		dispatch({type: GET_ORDER});
		fetch(config.orderUrl + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		)
		.then(checkResponse)
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
export const clearOrder:AppThunk = () => {
	return function (dispatch: Dispatch) {
		dispatch({type: CLEAR_ORDER});
	}
}
