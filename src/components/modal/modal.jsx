import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import css from './modal.module.css';
import closeImg from '../../images/close.svg';
import PropTypes from "prop-types";
import {ModalOverlay} from "../modal-overlay";

export const Modal = (props) => {
	useEffect(() => {
		const escFunc = (e) => (e.key === "Escape") && props.setModalActive(false);
		document.addEventListener('keydown', escFunc);
		return () => {
			document.removeEventListener('keydown', escFunc);
		}
	}, [props]);

	const closeModal = () => {
		props.setModalActive(false);
	};
    const portalContent = (
	    <>
			<div>
				<ModalOverlay setModalActive={props.setModalActive} />
				<div className={css.modal_content} onClick={e=>e.stopPropagation()}>
					{/*Заголовок портала*/}
					<div className={css.modal_content_caption}>
						<span className="text text_type_main-medium">{props.header}</span>
						<img src={closeImg} alt={"Закрыть"} className={css.close_button} onClick={closeModal}/>
					</div>
					{/*Компонент-содержание*/}
					{props.children}
				</div>
			</div>
	    </>);

    return ReactDOM.createPortal(
	    portalContent,
        document.getElementById('portal')
    );
    
}

Modal.propTypes = {
};
