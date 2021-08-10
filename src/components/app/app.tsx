import React,{useEffect} from 'react';
import css from './app.module.css';
import AppHeader from '../app-header';
import Margin from '../margin';
import {BurgerIngredients} from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import * as config from '../../config';
import {getApiData} from '../../utils/norma-api';

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
                <Margin height={"40px"} width={"44px"}/>
                <BurgerConstructor />
            </main>
        </div>
    );
}
