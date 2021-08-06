import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './portal.module.css';
import closeImg from '../../images/close.svg';
import {OrderDetails} from './order-details';

export const Portal = (props) => {
	
	useEffect(() => {
		// включаем обработчик нажатия Esc
		const escFunc = (e) => (e.key === "Escape") && props.setModalActive(false);
		document.addEventListener('keydown', escFunc);
		
		// выключаем обработчик
		return () => {
			document.removeEventListener('keydown', escFunc);
		}
	}, [props]);
	
	const label = (props.type==='product') ? 'Детали ингредиента' : null;
    const portalContent =
        <div className={css.modal} onClick={()=>{props.setModalActive(false)}}>
	        <div className={css.modal_content} onClick={e=>e.stopPropagation()}>
		        <div><span style={{float:'left'}}>{label}</span>
			        <img src={closeImg} alt={"Закрыть"} className={css.close_button} onClick={()=>props.setModalActive(false)}/>
		        </div>
		        {props.type==='order' && <OrderDetails/>}
		        {/*{props.content}*/}
	        </div>
        </div>

    return ReactDOM.createPortal(
	    portalContent,
        document.getElementById('portal')
    );
    
}