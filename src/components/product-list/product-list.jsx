import React from 'react';
import css from './index.module.css';
import {Product} from "../product";
import {ingredientType} from '../../prop-types';
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";

export const ProductList = (props) => {
    let location = useLocation();
    return (
       <>
           <p className="text text_type_main-medium" id={props.id} ref={props.subRef}>
	           {props.children}
           </p>
           <div className={css.product_list}>
               {props.apiData.map((itm) => {
                   return (
                       <Link key={itm._id}
                           to={{
                               pathname: `ingredients/${itm._id}`,
                               state: { background: location }
                           }}
                           className={css.product_link}
                       >
                           <Product apiData={itm}/>
                       </Link>)
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