import React from 'react';
import css from './app.module.css';
import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from './components/burger-constructor';

function App() {
  return (
    <>
        <div className={css.main_rect}>

                <AppHeader />

            <div className={css.main_columns}>
                <BurgerIngredients />

                <BurgerConstructor />
            </div>
        </div>
    </>
  );
}

export default App;
