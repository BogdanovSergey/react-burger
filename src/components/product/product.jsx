import React, {useState} from 'react';
import css from './index.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientDetails, Portal} from "../portal";

export const Product = ({apiData}) => {
    const [modalIsActive, setModalActive] = useState(false);

    const productContent =
        <div className={css.product} onClick={()=>setModalActive(true)}>
            <img src={apiData.image} alt={apiData.name}/>
            <span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{apiData.price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span>
               {apiData.name}
           </span>
        </div>

    return (
        <div>
            {productContent}
            {modalIsActive && <Portal setModalActive={setModalActive}>
	            Детали ингредиента
	            <IngredientDetails productData={apiData}/>
            </Portal>
            }
        </div>
    );
}

export default Product;
