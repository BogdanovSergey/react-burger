import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';
import css from './index.module.css';
import Product from "../product";


type listTypes = 'bun' | 'sauce' | 'main';

interface ProductListProps {
    listType: listTypes;
}

export const ProductList: React.FC<ProductListProps> = ({listType}) => {
    return (
       <>
           <p className="text text_type_main-medium">
               {listType}
           </p>
           {/*<div style={{display:'flex',flexFlow: 'row wrap'}}>*/}
           <div className={css.product_list}>
               {data.map((itm) => {
                   return (itm.type === listType) ?
                       <Product key={itm._id} image={itm.image} name={itm.name} price={itm.price}/> : null
               })}
           </div>

       </>
    );
}

export default ProductList;
