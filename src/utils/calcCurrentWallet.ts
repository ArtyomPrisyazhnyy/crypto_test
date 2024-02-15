import { ICoin } from '../types/Coin';
import { Wallet } from '../types/Wallet';

export const calcInitialWallet = (wallet: Wallet[]) => {
    const initialWallet = wallet.reduce((ac, e) => ac + e.count * e.price, 0);
    return initialWallet;
};

export const calcCurrentWallet = (wallet: Wallet[], currencies: ICoin[]) => {
    const currentWallet = wallet.reduce((ac, el) => {
        const currency = currencies.find((e) => e.id === el.id);
        const currencyPrice = currency ? parseFloat(currency.priceUsd) * el.count : 0;

        return ac + currencyPrice;
    }, 0);
    return currentWallet;
};
