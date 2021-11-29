import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './modal.module.css';
import closeImg from '../../images/close.svg';
import PropTypes from "prop-types";
import {ModalOverlay} from "../modal-overlay";

export const Modal = (props) => {
	useEffect(() => {
		// включаем обработчик нажатия Esc
		const escFunc = (e) => (e.key === "Escape") && props.setModalActive(false);
		document.addEventListener('keydown', escFunc);
		
		// выключаем обработчик
		return () => {
			document.removeEventListener('keydown', escFunc);
		}
	}, [props]);
	
    const portalContent =
	    <>
		    <ModalOverlay setModalActive={props.setModalActive}/>
	        <div className={css.modal_content} onClick={e=>e.stopPropagation()}>
				{/*Заголовок портала*/}
		        <div className={css.modal_content_caption}>
					<span className="text text_type_main-medium">{props.header}</span>
			        <img src={closeImg} alt={"Закрыть"} className={css.close_button} onClick={()=>props.setModalActive(false)}/>
		        </div>
				{/*Компонент-содержание*/}
		        {props.children}
	        </div>
	    </>;

    return ReactDOM.createPortal(
	    portalContent,
        document.getElementById('portal')
    );
    
}

Modal.propTypes = {
	setModalActive: PropTypes.func.isRequired
};
