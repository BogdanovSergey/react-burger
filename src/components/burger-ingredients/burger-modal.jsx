import React from 'react';
import css from './burger-modal.module.css';

const ModalComp = ({active, setActive}) => {
	//() => {setActive(false)}
	//onClick={e=>e.stopPropagation()}
	console.log(css.modal);
	return(
		<div className={active ? css.modal__content : css.modal} onClick={() => {setActive(false)}}>  {active ? "active":"modal"}
			<div className={css.modal__content} onClick={e=>e.stopPropagation()}>
			123
			</div>
		</div>
	);
	
	/*return ReactDOM.createPortal(
		<>
		</>
		this.el
	);*/
}
export default ModalComp;