import React, {useState, useCallback,FC} from 'react';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './index.module.css';
import { OrderDetails, Modal } from "../modal";
import { BurgerItem } from '../burger-item/burger-item';
import { useSelector, useDispatch } from '../../hooks/hooks'
import { MOVE_INGREDIENT, INGREDIENT_DELETE, COUNTER_DOWN } from '../../services/actions';
import { createOrder,clearOrder } from '../../services/actions/order';
import { TProps, TIngredient } from '../../types'

/*  Конструктор - ПРАВЫЙ блок */
export const BurgerConstructor: FC<TProps> = ({ onDropHandler }) => {
	const dispatch = useDispatch();
	const history = useHistory();
    const [modalIsActive, setModalActive] = useState(false);
	const { bun, contentItems } = useSelector((store) => store.ingr.burgerIngredients);
	const hasToken = localStorage.getItem('refreshToken');
    const [{ canDrop }, dropTarget] = useDrop({
        accept : "ingredient",
        drop(itemId: TIngredient) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });
	let opacity,dropMsgCls,column;
	if(canDrop) {
		dropMsgCls = css.drop_msg;
		opacity = 0.5;
		column = css.column_active;
	} else {
		dropMsgCls = css.no_drop_msg;
		opacity = 1;
		column = css.column;//css.constructor_candrop;
	}
	const moveItem = useCallback((dragIdx, idx) => {
		dispatch({
			type: MOVE_INGREDIENT,
			toIndex: idx,
			fromIndex: dragIdx
		})
	}, [dispatch])
	
	const orderSumm = (bun:TIngredient|null, items:TIngredient[]) => {
		let summ = (bun)? bun.price*2 : 0;
		if(items) items.map((itm)=>{return summ += itm.price});
		return summ;
	}
	const handleClick = () => {
		if (hasToken && bun) {
			let ingredientsArr:string[] = [bun._id]; // пусть сервер знает id булки
			for (let itm of contentItems) {
				ingredientsArr.push(itm._id)
			}
			dispatch(createOrder(ingredientsArr)); // redux-thunk
			setModalActive(true)
		} else {
			history.replace({ pathname: '/login' })
		}
	};
	const onClose = (e: Event) => {
		if(e) e.stopPropagation();
		setModalActive(false);
		dispatch(clearOrder());
	};

    return (
        <div className={column} ref={dropTarget} style={{opacity}}>
	        <div className={dropMsgCls}>
	            Переместите сюда ингредиент для добавления в заказ
            </div>
	        {bun &&
	        <div className="ml-15">
		        <ConstructorElement
			        text={bun.name+" (Верх)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
			        type="top"
		        />
	        </div>
	        }
	        <div className={css.list}>
		        <ul>
		        {contentItems && contentItems.map((item, i) => {
		            const delFunc = () => {
					        console.log(item)
					        dispatch({
						        type: INGREDIENT_DELETE,
						        id : item.productId
					        })
					        dispatch({
						        type: COUNTER_DOWN,
						        key: item._id,
						        typeItem: item.type
					        })
				        }
			        return (
					        <BurgerItem
						        key={item.productId}
						        item={item}
						        isLocked={false}
						        deleteFunc={delFunc}
						        moveFunc={moveItem}
						        index={i}
					        />
			        )
		        })
		        }</ul>
	        </div>
	        {bun &&
	        <div className="ml-15">
		        <ConstructorElement
			        text={bun.name+" (Низ)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
			        type="bottom"
		        />
	        </div>
	        }
            <div className={css.total}>
                <p className="text text_type_digits-medium">{orderSumm(bun, contentItems)}</p>
                <CurrencyIcon type="primary"/>
	            {bun && <Button type="primary" size="medium" onClick={handleClick}>Оформить заказ</Button>}
                {modalIsActive && <Modal onClose={onClose}>
                    <OrderDetails/>
                </Modal>}
            </div>
        
        </div>
    );
}
//
// export default BurgerConstructor;
