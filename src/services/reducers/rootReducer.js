import {
	INGREDIENTS_LOAD,
	INGREDIENTS_LOAD_CONSTR,
	INGREDIENTS_VIEW_DETAILS,
	INGREDIENTS_DELETE_DETAILS,
	ORDER_LOAD,
	ORDER_NUMBER,
	INGREDIENTS_CHOOSE,
	INGREDIENT_DELETE,
	MOVE_INGREDIENT,
	COUNTER_UP,
	COUNTER_DOWN,
	RESET_CONSTRUCTOR
} from '../actions';
import {initialState} from '../initialState';
import {RandomKey} from '../../utils/random-key';

export const rootReducer = (state = initialState, action) => {
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
		case ORDER_LOAD:
			return {
				...state,
				order: {number: action.number}
			};
			
		case ORDER_NUMBER: // ?????
			return {
				...state,
				order: {orderId: action.number}
			};

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
					contentItems: [...state.burgerIngredients.contentItems].filter(el => el.productId !== action.id)
				}
			};
		}
		case COUNTER_DOWN: {
			console.log(action);
			if (action.type !== 'bun') {
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