import React, {useState} from 'react';
import css from './index.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientDetails, Portal} from "../portal";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";

export const Product = ({apiData}) => {
    const [modalIsActive, setModalActive] = useState(false);
	const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: apiData,
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	})
	const opacity = isDrag ? 0.5 : 1;
	const { counts } = useSelector(store => store.burgerIngredients);
    const productContent =
        <div className={css.product} onClick={()=>setModalActive(true)} ref={dragRef} style={{ opacity }}>
            <img src={apiData.image} alt={apiData.name}/>
            <span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{apiData.price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span className="text text_type_main-small">
               {apiData.name}
           </span>
	        {counts[apiData._id] > 0 && <Counter count={counts[apiData._id]} size="default"/>}
        </div>

    return (
        <div>
            {productContent}
            {modalIsActive && <Portal header="Детали ингредиента" setModalActive={setModalActive}>
	            <IngredientDetails productData={apiData}/>
            </Portal>
            }
        </div>
    );
}

Product.propTypes = {
	name : PropTypes.string,
	image: PropTypes.string,
	price: PropTypes.number
};
export default Product;
