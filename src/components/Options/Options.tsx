import React from 'react';
import ButtonListForSelect from '../ButtonListForSelect/ButtonListForSelect';
import { ISortOptions } from '../../types/sortOptions';
import Search from '../Search/Search';
import './Options.scss';

interface HeaderProps {
    searchValue: string;
    setSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sortField: ISortOptions['value'];
    setSortField: (value: ISortOptions['value']) => void;
    sortOptions: ISortOptions[];
}

const Options: React.FC<HeaderProps> = ({
    searchValue,
    setSearchValue,
    sortField,
    setSortField,
    sortOptions,
}) => {
    return (
        <div className="options">
            <div className="sortBy">
                <ButtonListForSelect
                    items={sortOptions}
                    selectedValue={sortField}
                    onSelect={(value: ISortOptions['value']) => setSortField(value)}
                    ButtonListDescription="Sort by: "
                />
            </div>

            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
    );
};

export default Options;
