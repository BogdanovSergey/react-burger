import React, {useState} from 'react';
import css from './index.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientDetails, Portal} from "../portal";
import {productPropTypes} from '../../prop-types';

export const Product = ({apiData}) => {
    const [modalIsActive, setModalActive] = useState(false);

    const productContent =
        <div className={css.product} onClick={()=>setModalActive(true)}>
            <img src={apiData.image} alt={apiData.name}/>
            <span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{apiData.price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span className="text text_type_main-small">
               {apiData.name}
           </span>
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

Product.propTypes = productPropTypes;
export default Product;
