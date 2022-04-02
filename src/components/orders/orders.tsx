import React from 'react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FeedItem } from '../feed-item/feed-item'
import { config } from '../../config'
import styles from './orders.module.css'
import {getCookie} from "../../utils/cookie";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActions'
import { ReduxStore } from '../../services/store.types'
import { TOrder } from '../../types'

export function Orders() {
    const dispatch = useDispatch();
    const { messages } = useSelector((store: ReduxStore) => store.messages);
    const [orders, setOrders] = useState<TOrder[]>([]);
    let accessToken = getCookie('token'), token = '';
    if (accessToken) token = accessToken.split(' ')[1];


    useEffect(() => {
        console.log(accessToken);
        console.log(config.feedsUserUrl);
        dispatch({
            type: WS_CONNECTION_START,
            payload: config.feedsUserUrl + accessToken
        });
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (messages[0]?.orders) {
            console.log(messages[0].orders);
            setOrders(messages[0].orders);
        }
    }, [messages]);

    return (
        <div className={ styles.userFeed }>
            {
                Boolean(orders.length)
                    ? orders.map(item => item?.ingredients?.length ? <FeedItem key={item['_id']} order={item} showStatus={true}/> : false)
                    : <p className="text text_type_main-default text_color_inactive pt-4">У Вас еще не было заказов</p>
            }
        </div>
    )
}