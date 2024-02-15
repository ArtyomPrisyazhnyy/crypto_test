import React from 'react';
import Loader from '../Loader/Loader';
import { ICoin } from '../../types/Coin';
import Error from '../Error/Error';
import { formatNumber } from '../../utils/formatNumber';
import './TopCoin.scss';

export interface TopCoinProps {
    headerInfo: ICoin[] | undefined;
    isError: boolean;
}

const TopCoin: React.FC<TopCoinProps> = ({ headerInfo, isError }) => {
    return (
        <div className="topRankedCoinsInfo">
            {!headerInfo && !isError && <Loader />}
            {isError && <Error />}
            {headerInfo &&
                Array.isArray(headerInfo) &&
                headerInfo.map((coin) => (
                    <div key={coin.rank} className="topRankedCoin">
                        <div className="topRankedCoin__inner">{coin.symbol}:</div>
                        <div className="topRankedCoin__inner">
                            ${formatNumber(parseFloat(coin.priceUsd))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TopCoin;
