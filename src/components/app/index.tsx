import React,{useEffect} from 'react';
import css from './index.module.css';
import AppHeader from '../app-header';
import Margin from '../margin';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';

function App() {
    const apiUrl = 'https://norma.nomoreparties.space/api/ingredients ';
    const [apiData, setApiData] = React.useState({});

    function getApiData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(result => {
                setApiData(result.data);
                console.log(result.data)
            })
            .catch(error => {
                console.log(error);
                alert('Ошибка при подключении к api');
            });
    }

    useEffect(()=>{
        getApiData();
    },[]);

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

export default App;
