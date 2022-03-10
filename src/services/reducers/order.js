import {ORDER_LOAD, ORDER_NUMBER} from "../actions";

const initialState =
    {
        number: 0
    };

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_LOAD:
            return {
                ...state,
                number: action.number
            };


        default: {
            return state;
        }
    }
}
