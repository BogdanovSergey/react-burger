import React from 'react';
import css from './index.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export interface ProductProps {
    name: string;
    price: number;
    image: string;
}

//function Product(name:string,) {
export const Product: React.FC<ProductProps> = ({name,price,image}) => {
    return (
        <div className={css.product_some}>
            <img src={image} alt={""}/>
            <span style={{border: '4px double red',display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span>
               {name}
           </span>
        </div>
    );
}

export default Product;
