import React from 'react';
import css from './app.module.css';
import AppHeader from './components/app-header';
import Margin from './components/margin';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from './components/burger-constructor';

function App() {
  return (
    <>
        <div className={css.main_rect}>
            <AppHeader />
            <main className={css.main_columns}>
                <BurgerIngredients />
                <Margin height={"40px"} width={"44px"}/>
                <BurgerConstructor />
            </main>
        </div>
    </>
  );
}

export default App;
