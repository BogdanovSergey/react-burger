import React, {useState} from 'react';
import css from './index.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Portal} from "../portal";

export interface ProductProps {
    apiData:any; // пока не понимаю как на TS описать эту структуру данных
}

//function Product(name:string,) {
export const Product: React.FC<ProductProps> = ({apiData}) => {
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
            {modalIsActive && <Portal setModalActive={setModalActive} type="product" productData={apiData}/>}
        </div>
    );
}

export default Product;
