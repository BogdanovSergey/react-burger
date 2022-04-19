import React, {useRef, useEffect} from 'react';
import PropTypes from "prop-types";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger.module.css';
import {ingredientType} from '../../prop-types';
import {ProductList} from '../product-list';
import {useSelector} from '../../hooks/hooks';

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState<string>('bun');
	const apiData = useSelector((store) => store.ingr.data);
	const setTab = (tab:any) => {
		//console.log(tab);
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	const listBun = apiData.filter((itm)=>itm.type==='bun' && itm);
	const listMain= apiData.filter((itm)=>itm.type==='main'&& itm);
	const listSauce=apiData.filter((itm)=>itm.type==='sauce' && itm);
	const primaryRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<any>(null);
	const sauceRef = useRef<any>(null);
	const mainRef = useRef<any>(null);

	const handleScroll = () => {
		if (primaryRef && bunRef && sauceRef && mainRef && primaryRef.current && bunRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
			const sauceDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
			const mainDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader = minDistance === bunDistance
				? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
			//setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
			setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader))
		}
	}
	useEffect(() => {
		document.querySelector(`#${current}`)?.scrollIntoView();
	},[current])

    return (
        <div className={css.column}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div className={css.fl}>
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>Булки</Tab>
	            <Tab value="main" active={current === 'main'} onClick={setTab}>Начинки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>Соусы</Tab>
            </div>
            <div className={css.scrollzone} ref={primaryRef} onScroll={handleScroll} >
				{/*// @ts-ignore*/}
	            <ProductList apiData={listBun} id={'bun'} subRef={bunRef}>Булки</ProductList>{/*// @ts-ignore*/}
	            <ProductList apiData={listMain} id={'main'} subRef={mainRef}>Начинки</ProductList>{/*// @ts-ignore*/}
	            <ProductList apiData={listSauce} id={'sauce'} subRef={sauceRef} >Соусы</ProductList>
                
            </div>

        </div>
    );
}
BurgerIngredients.propTypes = {
	apiData: PropTypes.arrayOf(ingredientType)
};
