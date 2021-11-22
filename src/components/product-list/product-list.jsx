import React from 'react';
import css from './index.module.css';
import {Product} from "../product";
import {ingredientType} from '../../prop-types';
import PropTypes from "prop-types";

export const ProductList = (props) => {
    return (
       <>
           <p className="text text_type_main-medium" id={props.id} ref={props.subRef}>
	           {props.children}
           </p>
           <div className={css.product_list}>
               {props.apiData.map((itm) => {
                   return (<Product key={itm._id} apiData={itm}/>)
               })}
           </div>
       </>
    );
}

ProductList.propTypes = {
	id : PropTypes.string,
	apiData: PropTypes.arrayOf(ingredientType)
};
export default ProductList;