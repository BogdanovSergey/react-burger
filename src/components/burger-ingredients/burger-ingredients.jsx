import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger.module.css';
import ModalComp from './burger-modal';
import ProductList from '../product-list';

export const BurgerIngredients = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [current, setCurrent] = React.useState('one');

    return (
        <div className={css.column}>
            <p className="text text_type_main-large">
                Соберите бургер

            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={css.scrollzone}>

                <button onClick={()=>setModalActive(true)}>open modal</button>

                <ModalComp active={modalActive} setActive={setModalActive}/>

                <ProductList listType={'bun'} apiData={props.apiData.filter((i)=>i.type==='bun' && i)}/>

                <ProductList listType={'main'} apiData={props.apiData.filter((i)=>i.type==='main'&& i)}/>

                <ProductList listType={'sauce'} apiData={props.apiData.filter((i)=>i.type==='sauce' && i)}/>

            </div>

        </div>
    );
}

