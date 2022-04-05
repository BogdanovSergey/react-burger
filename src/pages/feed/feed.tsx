import React from "react";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { FeedItem } from '../../components/feed-item/feed-item';
import styles from './feed.module.css';
import { config } from '../../config';
import { TOrder } from '../../types';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../../services/actions/wsActions';

export function FeedPage() {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);
    const [orders, setOrders] = useState<TOrder[]>([]);
    const { messages } = useSelector((store) => store.messages);
    const [createdNumbers, setCreatedNumbers] = useState<TOrder[][]>([]);
    const [doneNumbers, setDoneNumbers] = useState<TOrder[][]>([]);

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: config.feedsUrl});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [dispatch]);

    useEffect(() => {
        if (messages?.orders) {
            setOrders(messages.orders);
            setTotal(messages.total);
            setTotalToday(messages.totalToday)
        }
    }, [messages]);

    const splitArr = (arr: any, size: number) => arr.reduce((item: any, c: any) => {
        if(item[item.length-1].length === size) {item.push([]);}
        item[item.length-1].push(c);
        return item;
    }, [[]]);

    useEffect(() => {
        if (orders.length) {
            const created = orders.filter(item => item.status === 'created');
            const done = orders.filter(item => item.status === 'done');
            setCreatedNumbers(splitArr(created, 10));
            setDoneNumbers(splitArr(done, 10))
        }
    }, [orders]);

    return (
        <div>
            <p className="text text_type_main-large pt-4 pb-6">
                Лента заказов
            </p>
            <section className={ styles.content }>
                <div className={ styles.feed }>
                    { Boolean(orders.length) && orders.map(item => item?.ingredients?.length ? <FeedItem key={item['_id']} order={item} showStatus={false} /> : false) }
                </div>

                <div className={ styles.feedInfo + ' pl-8'}>
                    <div className={ styles.statusesWrapper }>
                        <section className={ styles.statuses }>
                            <header className="text text_type_main-medium pb-6">Готовы:</header>
                            <div className={ styles.statusesColumns }>
                                {
                                    doneNumbers.length && doneNumbers[0].length
                                        ? doneNumbers.map((doneNumbersColumn, i) =>
                                            <div key={i} className={ styles.statusesColumn }>
                                                { doneNumbersColumn.map(item => <span key={item.number} className={ styles.done + ' text text_type_digits-default' }>{item.number}</span>) }
                                            </div>)
                                        : <p className="text text_type_main-medium text_color_inactive">нет</p>
                                }
                            </div>
                        </section>
                        <section>
                            <header className="text text_type_main-medium pb-6">В работе:</header>
                            <div className={ styles.statusesColumns }>
                                {
                                    createdNumbers.length && createdNumbers[0].length
                                        ? createdNumbers.map((createdNumbersColumn, i) =>
                                            <div key={i} className={ styles.statusesColumn }>
                                                { createdNumbersColumn.map(item => <span key={item.number} className="text text_type_digits-default">{item.number}</span>) }
                                            </div>)
                                        : <p className="text text_type_main-medium text_color_inactive">нет</p>
                                }
                            </div>
                        </section>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mt-10">Выполнено за все время:</p>
                        <p className="text text_type_digits-large">{total}</p>

                        <p className="text text_type_main-medium mt-10">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{totalToday}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}