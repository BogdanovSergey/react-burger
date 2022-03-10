import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux'

import {/* AppDispatch, AppThunk,*/ ReduxStore } from './store.types'

export const useSelector: TypedUseSelectorHook<ReduxStore> = selectorHook
//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>()