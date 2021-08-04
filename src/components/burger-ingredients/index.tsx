import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';
import ProductList from '../product-list';

interface p  {
    apiData:()=>{}
}

const BurgerIngredients:React.FC<p> =  (apiData) => {
    const [current, setCurrent] = React.useState('one')
    console.log(p.apiData);
    return (
        <div className={css.column}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={css.scrollzone}>
                <ProductList listType={'bun'}/>

                <ProductList listType={'main'}/>

                <ProductList listType={'sauce'}/>
            </div>

        </div>
    );
}

export default BurgerIngredients;

