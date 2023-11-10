import React from 'react';

import styles from './ButtonListForSelect.module.scss';

interface ButtonListProps<T> {
    items: { value: T; label: string }[];
    selectedValue: T;
    onSelect: (value: T) => void;
    ButtonListDescription?: string;
}

const ButtonListForSelect = <T,>({ 
    items, 
    selectedValue, 
    onSelect, 
    ButtonListDescription, 
}: ButtonListProps<T>) => {
    return (
        <ul className={styles.btn__list}>
            <li className={styles.btn__list__desc}>{ButtonListDescription}</li>
            {items.map((item, index) => (
                <li key={index}
                    className={`${styles.btn__list__select} ${selectedValue === item.value ? styles.btn__list__selected : ''}`}
                    onClick={() => onSelect(item.value)}
                >
                    {item.label}
                </li>
            ))}
        </ul>
    );
};

export default ButtonListForSelect;
