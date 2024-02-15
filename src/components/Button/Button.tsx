import React from 'react';

export interface ButtonProps {
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    variant?: string;
    padding?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false, variant }) => {
    return (
        <button className={variant} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
