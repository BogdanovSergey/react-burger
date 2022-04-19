import React, {useEffect} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from 'react-dom';
import css from './modal.module.css';
import { ModalOverlay } from "../modal-overlay";
import { FunctionComponent } from 'react'

interface IModalProps {
	onClose: any,
	header?: string
}

export const Modal : FunctionComponent<IModalProps> = (props) => {
	useEffect(() => {
		const escFunc = (e:KeyboardEvent) => (e.key === "Escape") && props.onClose();
		document.addEventListener('keydown', escFunc);
		return () => {
			document.removeEventListener('keydown', escFunc);
		}
	}, [props]);

    const portalContent = (
			<div>
				<ModalOverlay onClick={props.onClose} />
				<div className={css.modal_content} onClick={e=>e.stopPropagation()}>
					{/*Заголовок портала*/}
					<div className={css.modal_content_caption}>
						<span className="text text_type_main-medium">{props.header}</span>
						<div className={css.close_button} title="Закрыть">
							<CloseIcon type="primary" onClick={props.onClose}/>
						</div>
					</div>
					{/*Компонент-содержание*/}
					{props.children}
				</div>
			</div>);

    return ReactDOM.createPortal(
	    portalContent,
        document.getElementById('portal') as HTMLElement
    );
    
}
