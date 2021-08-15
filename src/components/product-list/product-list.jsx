import React from 'react';
import css from './index.module.css';
import {Product} from "../product";

export const ProductList = (props) => {
    return (
       <>
           <p className="text text_type_main-medium" id={props.id}>
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

export default ProductList;
