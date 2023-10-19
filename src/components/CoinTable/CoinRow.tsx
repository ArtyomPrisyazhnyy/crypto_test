import React from 'react';
import { Coin } from '../../types/Coin';
import { formatNumber } from '../../utils/formatNumber';
import { useNavigate } from 'react-router-dom';
import { COIN_INFO } from '../../utils/consts';

import styles from './CoinList.module.scss';

import CoinSVG from '../../assets/img/coin.svg'

interface CoinListProps {
  coin: Coin;
}

const CoinRow: React.FC<CoinListProps> = ({coin}) => {
    const navigate = useNavigate()

    let imageUrl = CoinSVG;
    if (!!coin && !!coin.symbol) {
        imageUrl = `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
    }


    return (
        <tr className={`${styles.tr} ${styles.tr__link}`} onClick={() => navigate(COIN_INFO + coin.id)}>
            <td className={styles.td}>{coin.rank}</td>
            <td className={`${styles.td}`}>
                <div className={styles.coin__img__wrapper}>
                    <img src={imageUrl} alt={coin.symbol} height='24' width='24' 
                    onError={(e) => (e.currentTarget.src = CoinSVG)}  />
                </div>
            </td>
            <td className={`${styles.td} ${styles.sticky_column}`}>{coin.name}</td>
            <td className={styles.td}>{coin.symbol}</td>
            <td className={styles.td}>{formatNumber(parseFloat(coin.marketCapUsd))}</td>
            <td className={styles.td}>${formatNumber(parseFloat(coin.priceUsd))}</td>
            <td className={styles.td}>{formatNumber(parseFloat(coin.supply))}</td>
            <td className={styles.td}>{formatNumber(parseFloat(coin.volumeUsd24Hr))}</td>
            <td className={styles.td}>
                {parseFloat(coin.changePercent24Hr) > 0 ? "+" : "-"}
                {formatNumber(Math.abs(parseFloat(coin.changePercent24Hr)))}
            </td>
        </tr>
    )
}

export default CoinRow