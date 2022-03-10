import css from "./modal-overlay.module.css";
import React from "react";

export const ModalOverlay = (props:any) => {
	return <div className={css.modal_overlay} onClick={()=>{props.setModalActive(false);}} />
}

export default ModalOverlay;