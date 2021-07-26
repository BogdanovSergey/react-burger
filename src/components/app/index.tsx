import React from 'react';
import css from './index.module.css';
import AppHeader from '../app-header';
import Margin from '../margin';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';

function App() {
  return (
    <div className={css.main_rect}>
        <AppHeader />
        <main className={css.main_columns}>
            <BurgerIngredients />
            <Margin height={"40px"} width={"44px"}/>
            <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
