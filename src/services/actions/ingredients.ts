import * as config from '../../config';
import {AppDispatch as Dispatch, AppThunk} from '../../types';
import {INGREDIENTS_LOAD} from '../actions';
import {checkResponse} from "../../utils/api-requests";

export const getIngredients:AppThunk =() => {
	return function(dispatch:Dispatch) {
		fetch(config.getIngredientsUrl)
			.then(checkResponse)
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

export interface IGetIngredientsAction {
	readonly type: typeof INGREDIENTS_LOAD;
}
export type TIngredientsActions =
	| IGetIngredientsAction;