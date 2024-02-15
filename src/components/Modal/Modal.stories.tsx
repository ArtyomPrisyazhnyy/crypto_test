import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Modal, { ModalProps } from './Modal';
import PortfolioModal from '../Portfolio/PortfolioModal/PortfolioModal';
import AddModal from '../AddModal/AddModal';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default {
    title: 'Modal',
    component: Modal,
    decorators: [
        (StoryFn) => (
            <QueryClientProvider client={queryClient}>
                <StoryFn />
            </QueryClientProvider>
        ),
    ],
} as Meta;

const Template: StoryFn<ModalProps> = (args) => {
    return <Modal {...args}>{args.children}</Modal>;
};

const AddModalInside = () => {
    const [addCoinValue, setAddCoinValue] = useState<string>('initial value');

    return (
        <AddModal
            addCoin={() => console.log('Add coin')}
            addCoinValue={addCoinValue}
            setAddCoinValue={setAddCoinValue}
        />
    );
};

export const AddModalInsideModal = Template.bind({});
AddModalInsideModal.args = {
    show: true,
    onHide: () => console.log('Close modal'),
    children: (
        <div>
            <AddModalInside />
        </div>
    ),
};

export const PortfolioModalInsideModal = Template.bind({});
PortfolioModalInsideModal.args = {
    show: true,
    onHide: () => console.log('Close modal'),
    children: (
        <div>
            <PortfolioModal portfolioCoins={[]} totalPrice="0" />
        </div>
    ),
};
