import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger.module.css';

import ProductList from '../product-list';

export const BurgerIngredients = (props) => {
	//const [modalIsActive, setModalActive] = useState(false);
    const [current, setCurrent] = React.useState('one');
    
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
	            
                <ProductList listType={'bun'} apiData={props.apiData.filter((itm)=>itm.type==='bun' && itm)}/>

                <ProductList listType={'main'} apiData={props.apiData.filter((itm)=>itm.type==='main'&& itm)}/>

                <ProductList listType={'sauce'} apiData={props.apiData.filter((itm)=>itm.type==='sauce' && itm)}/>
                
            </div>

        </div>
    );
}
