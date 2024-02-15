import Button, { ButtonProps } from './Button';
import { StoryFn } from '@storybook/react';
import '../../scss/app.scss';

export default {
    title: 'Button',
    component: Button,
};

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Add = Template.bind({});
Add.args = {
    children: 'Add',
    variant: 'add-button',
};

export const Remove = Template.bind({});
Remove.args = {
    children: 'remove',
    variant: 'remove-button',
};

export const Close = Template.bind({});
Close.args = {
    children: 'Close',
    variant: 'close-button',
};
