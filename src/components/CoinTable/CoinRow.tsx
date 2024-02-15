import React from 'react';
import { ICoin } from '../../types/Coin';
import { formatNumber } from '../../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { COIN_INFO } from '../../utils/consts';

import CoinSVG from '../../assets/img/coin.svg';

export interface CoinRowProps {
    coin: ICoin;
    hasShadow: boolean;
}

const CoinRow: React.FC<CoinRowProps> = ({ coin, hasShadow }) => {
    const navigate = useNavigate();

    let imageUrl = CoinSVG;
    if (!!coin && !!coin.symbol) {
        imageUrl = `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`;
    }

    return (
        <tr className={`tr tr__link`} onClick={() => navigate(COIN_INFO + coin.id)}>
            <td className={`td td__logo`}>{coin.rank}</td>
            <td className={`td sticky_column ${hasShadow ? 'hasShadow' : ''}`}>
                <div className="coin__img__wrapper">
                    <img
                        src={imageUrl}
                        alt={coin.symbol}
                        height="24"
                        width="24"
                        onError={(e) => (e.currentTarget.src = CoinSVG)}
                    />
                    <span className="coin-name">{coin.name}</span>
                </div>
            </td>
            <td className="td">{coin.symbol}</td>
            <td className="td td__marketCap">{formatNumber(parseFloat(coin.marketCapUsd))}</td>
            <td className="td td__price">${formatNumber(parseFloat(coin.priceUsd))}</td>
            <td className="td">{formatNumber(parseFloat(coin.supply))}</td>
            <td className="td">{formatNumber(parseFloat(coin.volumeUsd24Hr))}</td>
            <td
                className="td td__changes"
                style={{ color: parseFloat(coin.changePercent24Hr) >= 0 ? 'green' : 'red' }}>
                {parseFloat(coin.changePercent24Hr) > 0 ? '+' : '-'}
                {formatNumber(Math.abs(parseFloat(coin.changePercent24Hr)))}
            </td>
        </tr>
    );
};

export default CoinRow;
