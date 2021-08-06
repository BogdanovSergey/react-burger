import React from 'react';
import ReactDOM from 'react-dom';

export const Portal = () => {

    const portalContent =
        <div>
            123
        </div>


    return ReactDOM.createPortal(
        this.props.children,
        document.getElementById('portal')
    );
}