import * as config from '../../config';
import {Dispatch} from "redux";
import {INGREDIENTS_LOAD} from '../actions';
//import {TIngredient} from "../../types";


export interface IGetIngredientsAction {
	//readonly type: typeof INGREDIENTS_LOAD;
	//type: typeof INGREDIENTS_LOAD, data:TIngredient
}

//export const getIngredients:IGetIngredientsAction = () => {
export function getIngredients() {
	return function(dispatch:Dispatch) {
		fetch(config.getIngredientsUrl)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					return Promise.reject(response.status);
				}
			})
			.then(result => {
				dispatch({
					type: INGREDIENTS_LOAD,
					data: result.data
				})
			})
			.catch(error => {
				console.log(error);
				alert('Error ' + error + ' while connecting to Api');
			});
		
		
	}
}