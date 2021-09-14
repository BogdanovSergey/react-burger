import React,{useEffect} from 'react';
import css from './app.module.css';
import {AppHeader} from '../app-header';
import {BurgerIngredients} from '../burger-ingredients';
import {BurgerConstructor} from '../burger-constructor';
import * as config from '../../config';
import {getApiData} from '../../utils/norma-api';
import {ApiDataContext} from '../../utils/context';

export const App = () => {
    const apiUrl = config.apiUrl;
    const [apiData, setApiData] = React.useState([]);

    useEffect(()=>{
        getApiData(apiUrl, setApiData);
    },[apiUrl, setApiData]);

    return (
        <div className={css.main_rect}>
            <AppHeader />
            <main className={css.main_columns}>
                <BurgerIngredients apiData={apiData}/>
                <ApiDataContext.Provider value={apiData}>
                    <BurgerConstructor />
                </ApiDataContext.Provider>
            </main>
        </div>
    );
}

export default App;