import css from "./modal-overlay.module.css";
import React, {FunctionComponent, MouseEventHandler, SyntheticEvent} from "react";
import {useHistory} from "react-router";

type IModalOverlayProps = {
	setModalActive ?: (e: boolean) => void
	onClick ?: any
}

export const ModalOverlay : FunctionComponent<IModalOverlayProps> = (props) => {
	return <div className={css.modal_overlay} onClick={props.onClick} />
}

export default ModalOverlay;
