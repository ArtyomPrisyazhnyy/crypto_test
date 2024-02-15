import React, { useEffect, useState } from 'react';
import { ICoin } from '../../types/Coin';
import CoinRow from './CoinRow';

export interface CoinListProps {
    coins: ICoin[];
    sortField: 'price' | 'marketCap' | 'changePercent';
}

type CompareFunction = (a: ICoin, b: ICoin) => number;

const CoinPage: React.FC<CoinListProps> = ({ coins, sortField }) => {
    const [hasShadow, setHasShadow] = useState<boolean>(false);

    useEffect(() => {
        const table = document.querySelector('.table__container');

        const handleScroll = () => {
            const stickyColumn = document.querySelector('.sticky_column') as HTMLElement;
            const bounding = stickyColumn.getBoundingClientRect();
            setHasShadow(!bounding.left);
        };

        if (table) {
            table.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (table) {
                table.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const compareCoins: CompareFunction = (a, b) => {
        switch (sortField) {
            case 'price':
                return parseFloat(b.priceUsd) - parseFloat(a.priceUsd);
            case 'marketCap':
                return parseFloat(b.marketCapUsd) - parseFloat(a.marketCapUsd);
            case 'changePercent':
                return (
                    Math.abs(parseFloat(b.changePercent24Hr)) -
                    Math.abs(parseFloat(a.changePercent24Hr))
                );
            default:
                return 0;
        }
    };

    const sortedCoins = [...coins].sort(compareCoins);

    return (
        <div className="table__container">
            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th className="tr" scope="col">
                            #
                        </th>
                        <th
                            className={`name sticky_column ${hasShadow ? 'hasShadow' : ''}`}
                            scope="col">
                            Name
                        </th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Price</th>
                        <th scope="col">Supply</th>
                        <th scope="col">Volume (24Hr)</th>
                        <th scope="col">%(24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {!sortedCoins.length && (
                        <tr>
                            <td style={{ textAlign: 'center' }} colSpan={9}>
                                No coins found
                            </td>
                        </tr>
                    )}

                    {sortedCoins.map((coin) => (
                        <CoinRow key={coin.id} coin={coin} hasShadow={hasShadow} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoinPage;
