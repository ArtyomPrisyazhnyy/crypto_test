import React, { useState } from 'react';

import styles from './Options.module.scss';
import ButtonListForSelect from '../ButtonListForSelect/ButtonListForSelect';
import { Coin } from '../../types/Coin';

interface HeaderProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    sortField: string;
    setSortField: (value: string) => void;
    sortOptions: { value: string; label: string }[];
}

const Options : React.FC<HeaderProps> = ({
    searchValue, 
    setSearchValue,
    sortField,
    setSortField,
    sortOptions
}) => {


    return (
        <div className={styles.options}>

            <div className={styles.sortBy}>
                <ButtonListForSelect
                    items={sortOptions}
                    selectedValue={sortField}
                    onSelect={(value) => setSortField(value)}
                    ButtonListDescription='Sort by: '
                />
            </div>

            <div className={styles.options__search}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                cx="14"
                cy="14"
                fill="none"
                id="XMLID_42_"
                r="9"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                />
                <line
                fill="none"
                id="XMLID_44_"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                x1="27"
                x2="20.366"
                y1="27"
                y2="20.366"
                />
            </svg>
                <input 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                    className={styles.options__search__input} 
                    type="text" 
                    placeholder='search'
                />
            </div>
            
        </div>
    )
}

export default Options