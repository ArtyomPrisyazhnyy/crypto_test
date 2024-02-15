import { Meta, StoryFn } from '@storybook/react';
import CoinList, { CoinListProps } from './CoinList';
import CoinRow, { CoinRowProps } from './CoinRow';
import { ICoin } from '../../types/Coin';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'CoinList',
    component: CoinList,
} as Meta;

const coins: ICoin[] = [
    {
        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        supply: '19626081.0000000000000000',
        maxSupply: '21000000.0000000000000000',
        marketCapUsd: '982417130048.3611129654350561',
        volumeUsd24Hr: '18733558878.2768260947621142',
        priceUsd: '50056.7143307092798081',
        changePercent24Hr: '4.1994547203527450',
        vwap24Hr: '48863.5570688247364066',
    },
    {
        id: 'ethereum',
        rank: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        supply: '120169997.4429381300000000',
        maxSupply: null,
        marketCapUsd: '317005587737.1774472355384009',
        volumeUsd24Hr: '7865497025.2597084296578771',
        priceUsd: '2637.9761544698817159',
        changePercent24Hr: '5.4341814859223753',
        vwap24Hr: '2545.9335860334461193',
    },
    {
        id: 'tether',
        rank: '3',
        symbol: 'USDT',
        name: 'Tether',
        supply: '96475135177.5781700000000000',
        maxSupply: null,
        marketCapUsd: '96478941352.1509250883158145',
        volumeUsd24Hr: '16253891071.0291317432711354',
        priceUsd: '1.0000394523891130',
        changePercent24Hr: '-0.0154052617216892',
        vwap24Hr: '0.9999352401600628',
    },
];

const Template: StoryFn<CoinListProps> = (args) => (
    <Router>
        <CoinList {...args} />
    </Router>
);

export const SortByPrice = Template.bind({});
SortByPrice.args = {
    coins: coins,
    sortField: 'price',
};

export const SortByMarketCap = Template.bind({});
SortByMarketCap.args = {
    coins: coins,
    sortField: 'marketCap',
};

export const SortByChangePercent = Template.bind({});
SortByChangePercent.args = {
    coins: coins,
    sortField: 'changePercent',
};

export const NoCoinsFound = Template.bind({});
NoCoinsFound.args = {
    coins: [],
    sortField: 'price',
};

export const CoinRowWithBitcoin: StoryFn<CoinRowProps> = (args) => (
    <Router>
        <CoinRow {...args} coin={coins[0]} />
    </Router>
);
CoinRowWithBitcoin.args = {};
