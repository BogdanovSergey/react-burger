import React,{useEffect} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header';
import {BurgerIngredients} from '../burger-ingredients';
import {BurgerConstructor} from '../burger-constructor';
import {INGREDIENTS_CHOOSE, COUNTER_UP} from '../../services/actions';
import {getIngredients} from '../../services/actions/ingredients';
import {useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const App = () => {
    const dispatch = useDispatch();
	
    useEffect(()=>{
	    dispatch(getIngredients());
    },[dispatch]);

    const handleDrop = (item) => {
        dispatch({
            type: INGREDIENTS_CHOOSE,
            item: item
        })
        dispatch({
            type: COUNTER_UP,
            key: item._id,
            typeItem: item.type
        })
    };

    return (
        <div className={css.main_rect}>
            <AppHeader />
            <main className={css.main_columns}>
	            <DndProvider backend={HTML5Backend}>
                       <BurgerIngredients />
                       <BurgerConstructor onDropHandler={handleDrop} />
	            </DndProvider>
            </main>
        </div>
    );
}

export default App;