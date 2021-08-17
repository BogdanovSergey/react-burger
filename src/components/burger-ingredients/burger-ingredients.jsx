import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger.module.css';
import {ingredientPropType} from '../../prop-types';
import {ProductList} from '../product-list';

export const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('bun');
	console.log(props.apiData);
	const setTab = (tab) => {
		console.log(tab);
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	const listBun = props.apiData.filter((itm)=>itm.type==='bun' && itm);
	const listMain= props.apiData.filter((itm)=>itm.type==='main'&& itm);
	const listSauce=props.apiData.filter((itm)=>itm.type==='sauce' && itm);
    return (
        <div className={css.column}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>Булки</Tab>
	            <Tab value="main" active={current === 'main'} onClick={setTab}>Начинки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>Соусы</Tab>
            </div>
            <div className={css.scrollzone}>
	            <ProductList apiData={listBun} id={'bun'}>Булки</ProductList>
	            <ProductList apiData={listMain} id={'main'}>Начинки</ProductList>
	            <ProductList apiData={listSauce} id={'sauce'}>Соусы</ProductList>
                
            </div>

        </div>
    );
}
BurgerIngredients.propTypes = ingredientPropType;