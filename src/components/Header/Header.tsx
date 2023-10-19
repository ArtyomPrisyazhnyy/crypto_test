import React, { useState } from 'react';
import { Coin } from '../../types/Coin';
import { useQuery } from 'react-query';
import styles from './Header.module.scss'
import { formatNumber } from '../../utils/formatNumber';
import { getCoinForHeader } from '../../api/api';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import Portfolio from '../Portfolio/Portfolio';

const Header: React.FC = () => {

    const { data: headerInfo, isError } = useQuery<Coin[] | undefined>({
        queryKey: ['headerCoins'], 
        queryFn: () => getCoinForHeader(),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });


    return (
        <header className={styles.header}>
            <div className={styles.topRankedCoinsInfo}>
                {!headerInfo && !isError && <Loader />}
                {isError && <Error />}
                {headerInfo && Array.isArray(headerInfo) && headerInfo.map((coin) => (
                    <div key={coin.rank} className={styles.topRankedCoin}>
                        <div className={styles.topRankedCoin}>{coin.symbol}: </div>
                        <div className={styles.topRankedCoin}>${formatNumber(parseFloat(coin.priceUsd))}</div>
                        
                    </div>
                ))}
            </div>

            <Portfolio />
        </header>
    )
}

export default Header