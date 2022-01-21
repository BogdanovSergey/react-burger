import React, {useRef, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger.module.css';
import {ingredientType} from '../../prop-types';
import {ProductList} from '../product-list';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
	const apiData = useSelector(store => store.ingr.data);
	const setTab = (tab) => {
		console.log(tab);
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	const listBun = apiData.filter((itm)=>itm.type==='bun' && itm);
	const listMain= apiData.filter((itm)=>itm.type==='main'&& itm);
	const listSauce=apiData.filter((itm)=>itm.type==='sauce' && itm);
	const primaryRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const handleScroll = () => {
		const bunDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
		const sauceDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
		const mainDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
		const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
		const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
		setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
	}
	useEffect(() => {
		document.querySelector(`#${current}`).scrollIntoView();
	},[current])

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
            <div className={css.scrollzone} ref={primaryRef} onScroll={handleScroll} >
	            <ProductList apiData={listBun} id={'bun'} subRef={bunRef}>Булки</ProductList>
	            <ProductList apiData={listMain} id={'main'} subRef={mainRef}>Начинки</ProductList>
	            <ProductList apiData={listSauce} id={'sauce'} subRef={sauceRef} >Соусы</ProductList>
                
            </div>

        </div>
    );
}
BurgerIngredients.propTypes = {
	apiData: PropTypes.arrayOf(ingredientType)
};
