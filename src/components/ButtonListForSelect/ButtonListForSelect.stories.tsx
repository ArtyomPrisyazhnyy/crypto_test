import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ButtonListForSelect, { ButtonListProps } from './ButtonListForSelect';

export default {
    title: 'ButtonListForSelect',
    component: ButtonListForSelect,
} as Meta;

const Template: StoryFn<ButtonListProps<string>> = (args) => {
    const [selectedSort, setSelectedSort] = useState(args.selectedValue);

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
        args.onSelect(value);
    };

    return (
        <ButtonListForSelect {...args} selectedValue={selectedSort} onSelect={handleSortChange} />
    );
};

export const DefaultSort = Template.bind({});
DefaultSort.args = {
    items: [
        { value: 'price', label: 'Price' },
        { value: 'marketCap', label: 'Market Cap' },
        { value: 'changePercent', label: 'Change (24Hr)' },
    ],
    selectedValue: 'price',
    onSelect: (value) => console.log('Selected:', value),
    ButtonListDescription: 'Sort by:',
};
