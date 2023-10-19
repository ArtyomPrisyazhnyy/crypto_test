import React, { useState } from 'react';
import { Coin } from '../../types/Coin';
import CoinRow from './CoinRow';

import styles from './CoinList.module.scss'

interface CoinListProps {
    coins: Coin[];
    sortField: string;
}

type CompareFunction = (a: Coin, b: Coin) => number;

const CoinPage: React.FC<CoinListProps> = ({coins, sortField}) => {

    const compareCoins: CompareFunction = (a, b) => {
        switch (sortField) {
            case 'price':
                return parseFloat(b.priceUsd) - parseFloat(a.priceUsd); // Обратная сортировка
            case 'marketCap':
                return parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd); // Обратная сортировка
            case 'changePercent':
                return Math.abs(parseFloat(b.changePercent24Hr)) - Math.abs(parseFloat(a.changePercent24Hr)); // Сортировка по модулю
            default:
                return 0;
        }
    };

    // Отсортируйте монеты с использованием функции сравнения
    const sortedCoins = [...coins].sort(compareCoins);

    return (
        <div className={styles.table__container}>
            <table className={styles.table}>
                <thead className={styles.thead} >
                    <tr className={styles.tr}>
                        <th scope='col'>#</th>
                        <th scope='col'>Logo</th>
                        <th className={styles.sticky_column} scope='col'>Name</th>
                        <th scope='col'>Symbol</th>
                        <th scope='col'>Market Cap</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Supply</th>
                        <th scope='col'>Volume (24Hr)</th>
                        <th scope='col'>%(24h)</th>

                    </tr>
                </thead>
                <tbody>
                    {sortedCoins.map((coin) => (
                        <CoinRow key={coin.id} coin={coin} />
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}

export default CoinPage