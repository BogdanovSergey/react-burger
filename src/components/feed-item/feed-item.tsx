import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './feed-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from '../../utils/fdate'
import { useLocation, Link } from 'react-router-dom'
import { ReduxStore } from '../../services/store.types'
import { TIngredient, TOrder } from '../../types'

export function FeedItem(props: { order: TOrder; showStatus: boolean }) {
    const showCount = 5;
    const location = useLocation();
    const {order, showStatus} = props;
    const orderNumber = order.number;
    const { data } = useSelector((store:ReduxStore) => store.ingr);
    const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<string[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (data.length) {
            let totalPrice = 0;
            let targetIngredients: TIngredient[] = [];
            let bun:boolean = false;
            order?.ingredients?.forEach((ingredient) => {
                let targetIngredient: TIngredient = data.filter(item => item['_id'] === ingredient)[0];
                if (targetIngredient?.price) {
                    targetIngredients.push(targetIngredient);
                    if (targetIngredient.type === 'bun' && !bun) {
                        totalPrice += 2 * targetIngredient.price;
                        bun = true;
                    }
                    if ((targetIngredient.type !== 'bun'))
                        totalPrice += targetIngredient.price
                }
            });
            setPrice(totalPrice);
            setOrderIngredients(targetIngredients)
        }
    }, [data, order.ingredients]);


    const getStatus = (status:string) => {
        if (status === 'done') return 'Выполнен';
        if (status === 'created') return 'Создан';
        if (status === 'pending') return 'Готовится';
        return false
    }

    useEffect(() => {
        let bun:boolean = false;
        let targetImages: string[] = [];
        orderIngredients.forEach(ingredient => {
            if (ingredient.type === 'bun' && !bun) {
                bun = true;
                targetImages.push(ingredient['image_mobile'])
            }
            if (ingredient.type !== 'bun') {
                targetImages.push(ingredient['image_mobile'])
            }
        });
        setImages(targetImages);
        setCount(targetImages.length)
    }, [orderIngredients]);

    //console.log(location)
    return (
        <Link
            key={orderNumber}
            to={{
                pathname: `${location.pathname}/${orderNumber}`,
                state: { background: location },
            }}
            className={styles.link}
        >
            <section className={styles.order}>
                <header className={styles.header}>
                    <p className="text text_type_digits-default">{'#' + order.number}</p>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                </header>
                <p className={styles.name + ' text text_type_main-medium pb-6 pt-6'}>
                    {order.name}<br/>
                    {showStatus && <span className="text text_type_main-default" style={{color: (order.status=== 'done')?'#00CCCC':'#FFFFFF'}}>{getStatus(order.status)}</span>}
                </p>
                <footer className={styles.footer}>
                    <div className={styles.images}>
                        {
                            images.map((image, i) => {
                                let left = -i * 15;
                                if (i <= showCount - 1)
                                    return  <div key={i} className={styles.imageWrapper} style={{left: left, zIndex: 100 - i}}>
                                        <img className={styles.image} src={image} alt="" />
                                    </div>
                                if (i === showCount)
                                    return  <div key={i} className={styles.imageWrapper} style={{left: left, zIndex: 100 - i}}>
                                        <p className={styles.count + ' text text_type_digits-default'}>{'+' + (count - showCount + 1)}</p>
                                        <img className={styles.image} style={{opacity: 0.5}} src={image} alt="" />
                                    </div>
                                return false
                            })
                        }
                    </div>
                    <div className={styles.coast}>
                        <span className='text text_type_digits-default pr-2'>{price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </footer>
            </section>
        </Link>
    )
}
