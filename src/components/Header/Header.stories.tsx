import { StoryFn, Meta } from '@storybook/react';
import Header from './Header';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default {
    title: 'Header',
    component: Header,
} as Meta;

const Template: StoryFn = (args) => (
    <QueryClientProvider client={queryClient}>
        <Header {...args} />
    </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {};
