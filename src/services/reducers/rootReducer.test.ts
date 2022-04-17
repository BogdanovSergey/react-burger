import {TIngredient} from "../../types";
import {
    COUNTER_DOWN, COUNTER_UP,
    INGREDIENT_DELETE, INGREDIENTS_CHOOSE,
    INGREDIENTS_LOAD, MOVE_INGREDIENT,
    RESET_CONSTRUCTOR
} from "../actions";
import {ingredientsReducer} from "./rootReducer";
import {TInitialState} from "../initialState";

const ingredient: TIngredient = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    carbohydrates: 53,
    calories: 420,
    proteins: 80,
    fat: 24,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    __v: 0,
    productId:''
}

const initialState:TInitialState = {
    data: [ingredient],
    burgerIngredients: {
        bun: ingredient,
        contentItems: [],
        counts: {}
    },
    portal: {}
};
describe('check ingredientsReducer', () => {

    it('check ORDER_LOAD', () => {
        const expected = {
            ...initialState
        };
        const received = ingredientsReducer(initialState, {
            type: INGREDIENTS_LOAD,
            data: [ingredient]
        });
        expect(received).toEqual(expected)
    });

    it('check RESET_CONSTRUCTOR', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients,
                bun: null
            }
        };
        const received = ingredientsReducer(initialState, {
            type: RESET_CONSTRUCTOR
        });
        expect(received).toEqual(expected)
    });

    it('check INGREDIENTS_CHOOSE', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients,
                bun: ingredient
            }
        };
        const received = ingredientsReducer(initialState, {
            type: INGREDIENTS_CHOOSE,
            item: ingredient
        });
        expect(received).toEqual(expected)
    });

    it('check INGREDIENT_DELETE', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients
            }
        };
        const received = ingredientsReducer(initialState, {
            type: INGREDIENT_DELETE,
            id:'60d3b41abdacab0026a733c6'
        });
        expect(received).toEqual(expected)
    });



    it('check COUNTER_UP', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients,
                counts:{
                    "60d3b41abdacab0026a733c6" : 1
                }
            }
        };
        const received = ingredientsReducer(initialState, {
            type: COUNTER_UP,
            id:'60d3b41abdacab0026a733c6',
            key:'60d3b41abdacab0026a733c6',
            typeItem:'bun'
        });
        expect(received).toEqual(expected)
    });

    it('check COUNTER_DOWN', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients
            }
        };
        const received = ingredientsReducer(initialState, {
            type: COUNTER_DOWN,
            id:'60d3b41abdacab0026a733c6',
            key:'60d3b41abdacab0026a733c6',
            typeItem:'bun'
        });
        expect(received).toEqual(expected)
    });
    it('check MOVE_INGREDIENT', () => {
        const expected = {
            ...initialState,
            burgerIngredients: {
                ...initialState.burgerIngredients,
                contentItems:[undefined]
            }
        };
        const received = ingredientsReducer(initialState, {
            type: MOVE_INGREDIENT,
            fromIndex: 1,
            toIndex: 3
        });
        expect(received).toEqual(expected)
    });
});