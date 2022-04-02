import React from 'react';
import {Order} from '../../components/order/order';
import styles from './order.module.css';

export function OrderPage() {
    return (
        <div className={styles.orderPage}>
            <Order/>
        </div>
    )
}
