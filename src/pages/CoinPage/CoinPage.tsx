import React, {  useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';
import { getCoinById } from '../../api/api';

import styles from './CoinPage.module.scss'
import { formatNumber } from '../../utils/formatNumber';
import CoinChart from '../../components/CoinChart/CoinChart';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

import CoinSVG from '../../assets/img/coin.svg'
import { HOME_ROUTE } from '../../utils/consts';
import Header from '../../components/Header/Header';
import { getPortfolioFromLS, savePortfolioToLS } from '../../utils/localStorage';

interface PortfolioCoin {
    id: string;
    coinquantity: number;
    priceAtTimeOfPurchase: number[]
};

const CoinPage = () => {
    const { id } = useParams();

    const queryClient = useQueryClient();

    const [addCoinValue, setAddCoinValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g, ''); 

        setAddCoinValue(newValue);
    };
   
    const { data: coinData, isLoading, isError } = useQuery({
        queryKey: ['coinData'], 
        queryFn: () => getCoinById(id),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });

    let loadedPortfolio = getPortfolioFromLS();

    const addCoin = () => {
      
        // Проверка наличия монеты с заданным id в портфеле
        const existingCoin = loadedPortfolio?.find((coin: PortfolioCoin) => coin.id === id);
      
        if (existingCoin) {
            existingCoin.coinquantity += parseFloat(addCoinValue);
            for (var i=0; i < parseFloat(addCoinValue); i++) {
                existingCoin.priceAtTimeOfPurchase.push(parseFloat(coinData.priceUsd));
            }
        } else {
          const newCoin = { id: id, coinquantity: parseFloat(addCoinValue), priceAtTimeOfPurchase: [] as number[] };

            // Добавляем новые цены в массив priceAtTimeOfPurchase
            for (let i = 0; i < parseFloat(addCoinValue); i++) {
                newCoin.priceAtTimeOfPurchase.push(parseFloat(coinData.priceUsd));
            }
      
          // Добавление новой монеты в портфель
          loadedPortfolio.push(newCoin);
        }
      
        savePortfolioToLS(loadedPortfolio);
      
        queryClient.invalidateQueries('coinData');
      };
      
    let imageUrl = CoinSVG;
    if (!!coinData && !!coinData.symbol) {
        imageUrl = `https://assets.coincap.io/assets/icons/${coinData.symbol.toLowerCase()}@2x.png`
    }

    return (
        <>
            <Header />
            <div className={styles.coin_info}>
                <Link 
                    className={styles.coin_info__back}
                    to={HOME_ROUTE}
                >
                    Back
                </Link>
                <div className={styles.wrapper}>
                {isLoading && <Loader />}
                {isError && <Error />}
                    {coinData && (
                        <>
                            <aside>
                                <div className={styles.coin_info__name}>
                                    <img 
                                        src={imageUrl} 
                                        alt={coinData.symbol} 
                                        height='24' 
                                        width='24' 
                                        onError={(e) => (e.currentTarget.src = CoinSVG)} 
                                    />
                                    {coinData.name} ({coinData.symbol})
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Supply: {formatNumber(parseFloat(coinData.supply))}
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Price: ${formatNumber(parseFloat(coinData.priceUsd))}
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Market Cap: {formatNumber(parseFloat(coinData.marketCapUsd))}
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Volume (24Hr): {formatNumber(parseFloat(coinData.volumeUsd24Hr))}
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Vwap (24Hr): {formatNumber(parseFloat(coinData.vwap24Hr))}
                                </div>

                                <div className={styles.coin_info__stat}>
                                    Change (24Hr): {parseFloat(coinData.changePercent24Hr) > 0 ? '+' : ''}
                                        {formatNumber(parseFloat(coinData.changePercent24Hr))}%
                                </div>

                                <div className={styles.addToPortfolio}>
                                    <div className={styles.addToPortfolio__title}>
                                        Add to portfolio
                                    </div>
                                    <div className={styles.coin__add}>
                                        <div className={styles.coin__count}>
                                            <input 
                                                className={styles.coin__count__input}
                                                type="number"
                                                value={addCoinValue}
                                                onChange={handleInputChange} 
                                                pattern="\d*"
                                                placeholder='add count'
                                            />
                                        </div>
                                        
                                        <button className={styles.coin__add__btn} onClick={addCoin}>Add</button>
                                    </div>
                                    
                                </div>

                            </aside>

                            <div className={styles.chart}>
                                <CoinChart />
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CoinPage