import {
	INGREDIENTS_LOAD,
	INGREDIENTS_LOAD_CONSTR,
	INGREDIENTS_VIEW_DETAILS,
	INGREDIENTS_DELETE_DETAILS,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	MOVE_INGREDIENT,
	COUNTER_UP,
	COUNTER_DOWN,
	RESET_CONSTRUCTOR
} from '../actions';
import {initialState, TInitialState} from '../initialState';
import {RandomKey} from '../../utils/random-key';
import {authReducer} from './auth';
import {orderReducer} from './order';
import { combineReducers } from 'redux';
import { TIngredient, TOrder } from '../../types'
import {Actions} from './burger-ingredient.types';

export const ingredientsReducer = (state:TInitialState = initialState, action:Actions) => {
	switch(action.type) {
		case INGREDIENTS_LOAD:
			return {
				...state,
				data: action.data
			};
		case RESET_CONSTRUCTOR:
			return {
				...state,
				burgerIngredients: initialState.burgerIngredients
			};
/*		case INGREDIENTS_LOAD_CONSTR:
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
			};*/

		case INGREDIENTS_CHOOSE:
			const item = action.item;
			if (item.type === 'bun') {
				console.log(item)
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						bun: item
					}
				};
			} else {
				const chosenItem = { ...item, productId: RandomKey() }
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						contentItems: [
							...state.burgerIngredients.contentItems,
							chosenItem
						]
					}
				};
			}
		
		case INGREDIENT_DELETE: {
			console.log(action);
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					contentItems: [...state.burgerIngredients.contentItems].filter((el:TIngredient) => el.productId !== action.id)
				}
			};
		}
		case COUNTER_DOWN: {
			console.log(action);
			if (action.typeItem !== 'bun') {
				return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						counts: {
							...state.burgerIngredients.counts,
							[action.key] : state.burgerIngredients.counts[action.key] - 1
						}
					}

				}
			} else {
				return state;
			}
		}
			
		case COUNTER_UP:
			if (action.typeItem === 'bun' && state.burgerIngredients.counts[action.key] >=2) {
				return state; }
			return {
					...state,
					burgerIngredients: {
						...state.burgerIngredients,
						counts: {
							...state.burgerIngredients.counts,
							[action.key] : ( state.burgerIngredients.counts[action.key] || 0 ) + 1
						}
					}
				}
		
		case MOVE_INGREDIENT: {
			const contentItems = [...state.burgerIngredients.contentItems];
			contentItems.splice(action.toIndex, 0,contentItems.splice(action.fromIndex,1)[0]);
			return {
				...state,
				burgerIngredients: {
					...state.burgerIngredients,
					contentItems: contentItems
				}
			};
		}
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	ingr: ingredientsReducer,
	auth: authReducer,
	order:orderReducer
});