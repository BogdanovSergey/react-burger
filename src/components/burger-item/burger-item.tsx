import React, {FC} from 'react';
import css from './item.module.css'
import {ConstructorElement, DragIcon} from  '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredient } from '../../types'
interface Props {
    item:TIngredient,
    index:number,
    isLocked:boolean,
    deleteFunc:any,
    moveFunc:any
}

export const BurgerItem: FC<Props> = ({item, index, isLocked, deleteFunc, moveFunc}) => {
    const id    = item._id
    const ref = useRef<HTMLLIElement>(null)
    const [, drop] = useDrop({
        accept: 'item',
	    
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(el:{ index: number}, monitor) {
            if (!ref.current) return;
            const dragIndex = el.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverRect = ref.current?.getBoundingClientRect();
            const hoverMidY = (hoverRect.bottom - hoverRect.top)/2;
            const clientOffset = monitor.getClientOffset();
            if(clientOffset != null) {
                const hoverClientY = clientOffset.y - hoverRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
                if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;
            }

            
            moveFunc(dragIndex, hoverIndex);
            el.index = hoverIndex;
        },
    });

    const [{ isDrag }, drag] = useDrag({
	    
        type: 'item',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    //console.log(item)
    const opacity = isDrag ? 0 : 1;
    drag(drop(ref))
	
    return (
        <li ref={ ref } className={ css.burger_item } style={{ opacity }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                isLocked={isLocked}
                thumbnail={item.image}
                handleClose={deleteFunc}
            />
        </li>
    );
};

export default BurgerItem;
