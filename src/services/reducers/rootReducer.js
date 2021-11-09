import {
	INGREDIENTS_LOAD,
	INGREDIENTS_LOAD_CONSTR,
	INGREDIENTS_VIEW_DETAILS,
	INGREDIENTS_DELETE_DETAILS,
	ORDER_NUMBER} from '../actions';
import {initialState} from '../initialState';

export const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		case INGREDIENTS_LOAD:
			return {
				...state,
				ingredients: []
			};
		case INGREDIENTS_LOAD_CONSTR:
			return {
				...state,
				constructor: []
			};
		case INGREDIENTS_VIEW_DETAILS:
			return {
				...state,
				ingredient: {}
			};
		case INGREDIENTS_DELETE_DETAILS:
			return {
				...state,
				ingredients: []
			};
		case ORDER_NUMBER:
			return {
				...state,
				order: {orderId: action.number}
			};
			
		default:
			return state;
	}
}