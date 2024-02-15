import { StoryFn } from '@storybook/react';
import Search, { SearchProps } from './Search';
import { useState } from 'react';

export default {
    title: 'Search',
    component: Search,
};

const Template: StoryFn<SearchProps> = (args: SearchProps) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    return <Search searchValue={searchValue} setSearchValue={onChangeInput} />;
};
export const DefaultInput = Template.bind({});
