import { BurgerIngredientStore } from './reducers/burger-ingredient.types'
import {TOrderStore} from './reducers/order.types'
import {AuthStore} from './reducers/auth.types';
import {WsStore} from "./reducers/ws.type";

export type ReduxStore = {
    ingr: BurgerIngredientStore
    auth: AuthStore
    order: TOrderStore
    messages: WsStore
}
