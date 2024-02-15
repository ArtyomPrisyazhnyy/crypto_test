import { Meta, StoryFn } from '@storybook/react';
import Pagination, { PaginationProps } from './Pagination';
import { useState } from 'react';

export default {
    title: 'Pagination',
    component: Pagination,
    argTypes: {
        hasMore: { control: 'boolean' },
    },
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => {
    const [page, setPage] = useState<number>(0);

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const handlePrevClick = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return <Pagination {...args} page={page} next={handleNextClick} prev={handlePrevClick} />;
};

export const Default = Template.bind({});
Default.args = {
    hasMore: true,
};
