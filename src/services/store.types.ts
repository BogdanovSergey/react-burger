import { BurgerIngredientStore } from './reducers/burger-ingredient.types'
import {OrderStore} from './reducers/order-number.types'
import {AuthStore} from './reducers/auth.types';

export type ReduxStore = {
    ingr: BurgerIngredientStore
    auth: AuthStore
    order: OrderStore

}
