import React, {useState} from 'react';
import css from './index.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Portal} from "../portal";

export interface ProductProps {
    name: string;
    price: number;
    image: string;
}

//function Product(name:string,) {
export const Product: React.FC<ProductProps> = ({name,price,image}) => {
    const [modalIsActive, setModalActive] = useState(false);

    const productContent =
        <div className={css.product_some} onClick={()=>setModalActive(true)}>
            <img src={image} alt={name}/>
            <span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span>
               {name}
           </span>
        </div>

    return (
        <div>
            {productContent}
            {modalIsActive && <Portal setModalActive={setModalActive} type="product" content={productContent}/>}
        </div>
    );
}

export default Product;
