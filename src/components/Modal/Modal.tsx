import React from 'react';
import Button from '../Button/Button';
import './Modal.scss';

export interface ModalProps {
    show: boolean;
    onHide: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onHide, children }) => {
    if (!show) return null;

    return (
        <div className="modal" onClick={onHide}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {children}
                <Button variant="close-button" onClick={onHide} style={{ padding: '3px 6px' }}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default Modal;
