import React from 'react';
import css from './index.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';

function BurgerConstructor() {
    return (
        <div className={css.burgerconstructor_column}>
            <div style={{ width:'60px',height:'100px',border:'4px double purple' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.map((itm) => (
                        <ConstructorElement
                            key={itm._id}
                            type="top"
                            isLocked={true}
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        />)
                    )
                }
            </div>
        </div>
    );
}

export default BurgerConstructor;
