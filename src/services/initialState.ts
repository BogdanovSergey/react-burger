import { TIngredient } from '../types'


export type TInitialState = {
	data: TIngredient[],
	burgerIngredients: {
		bun: TIngredient|null,
		contentItems:TIngredient[],
		counts: {
			[name:string]:number
		}
	},
	portal: {}
};



export const initialState:TInitialState = {
	data: [],
	burgerIngredients: {
		bun: null,
		contentItems:[],
		counts: {}
	},
	portal: {}
};
