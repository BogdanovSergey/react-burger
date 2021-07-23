import React from 'react';
import {Tab,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';
import Product from '../product';
import ProductList from '../product-list';
import data from '../../utils/data.json';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')
    return (
        <>
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
        </>
    );
}

export default BurgerIngredients;

