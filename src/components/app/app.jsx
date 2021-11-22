import React,{useEffect} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header';
import {BurgerIngredients} from '../burger-ingredients';
import {BurgerConstructor} from '../burger-constructor';
import * as config from '../../config';
import {getApiData} from '../../utils/norma-api';
import {ApiDataContext,OrderContext,SetOrderContext} from '../../utils/context';
import {INGREDIENTS_CHOOSE, COUNTER_UP} from '../../services/actions';
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const App = () => {
    const apiUrl = config.apiUrl;
    const [apiData, setApiData] = React.useState([]);
    const [orderObj, setOrderObj] = React.useState({number:0,items:[]});
    const dispatch = useDispatch();

    useEffect(()=>{
        getApiData(apiUrl, setApiData);
    },[apiUrl, setApiData]);

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
                <ApiDataContext.Provider value={apiData}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <OrderContext.Provider value={orderObj}>
                        <SetOrderContext.Provider value={setOrderObj}>
                            <BurgerConstructor onDropHandler={handleDrop} />
                        </SetOrderContext.Provider>
                    </OrderContext.Provider>
                    </DndProvider>
                </ApiDataContext.Provider>
            </main>
        </div>
    );
}

export default App;