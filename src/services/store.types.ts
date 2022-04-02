import { BurgerIngredientStore } from './reducers/burger-ingredient.types'
import {OrderStore} from './reducers/order.types'
import {AuthStore} from './reducers/auth.types';
import {WsStore} from "./reducers/ws.type";

export type ReduxStore = {
    ingr: BurgerIngredientStore
    auth: AuthStore
    order: OrderStore
    messages: WsStore
}
