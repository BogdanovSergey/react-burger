import { TIngredient, TOrder } from '../../types'
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

/*export type ActiveTabStore = {
    activeTab: string
}*/

export type BurgerIngredientStore = {
    data: TIngredient[]
    burgerIngredients: {
        bun: TIngredient,
        contentItems: TIngredient[],
        counts: {
            [name: string]: number
        }
    }
    //order: TOrder

}

export type GetIngredientsAction = { type: typeof INGREDIENTS_LOAD, data:TIngredient }
export type ResetConstructorAction = { type: typeof RESET_CONSTRUCTOR }
export type IngredientsChooseAction = { type: typeof INGREDIENTS_CHOOSE,item:TIngredient }
export type IngredientsDeleteAction = { type: typeof INGREDIENT_DELETE, id:string }
export type CounterDownAction = { type: typeof COUNTER_DOWN, typeItem:string, key:string, id:string  }
export type CounterUpAction = { type: typeof COUNTER_UP, typeItem:string, key:string, id:string  }
export type MoveAction = { type: typeof MOVE_INGREDIENT,fromIndex:number, toIndex:number }


export type Actions =
    | GetIngredientsAction
    | ResetConstructorAction
    | IngredientsChooseAction
    | IngredientsDeleteAction
    | CounterDownAction
    | CounterUpAction
    | MoveAction
