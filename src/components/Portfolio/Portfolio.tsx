import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getDataAndUpdateState } from '../../api/api';
import { formatNumber } from '../../utils/formatNumber';
import PortfolioModal from './PortfolioModal/PortfolioModal';
import { Coin } from '../../types/Coin';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

import styles from './Portfolio.module.scss'

interface PortfolioCoin {
    id: string;
    coinquantity: number;
    priceAtTimeOfPurchase: number[]
};
  

const Portfolio = () => {
    const [portfolioModalVisible, setPortfolioModalVisible] = useState<boolean>(false);

    const ids: string[] = [];
    const  [portfolioTotalPrice, setPortfolioTotalPrice]= useState<number>(0);
    const [totalPortfolioPriceAtTimeOfPurchase, setTotalPortfolioPriceAtTimeOfPurchase ] = useState<number>(0);
    const [percent, setPercent] = useState<string>('')
    const [formattedDifference, setFormattedDifference] = useState<string>('');

    const portfolioKey = "userPortfolio";
    const storedPortfolioJSON = localStorage.getItem(portfolioKey);
    let loadedPortfolio: PortfolioCoin[] = [];


    if (storedPortfolioJSON) {
        loadedPortfolio = JSON.parse(storedPortfolioJSON);

        loadedPortfolio.map((loadedCoinFromLS: any) => {
            ids.push(loadedCoinFromLS.id)
        })
      
        console.log("Загруженный портфель:", loadedPortfolio);
    } else {
        console.log("Портфель не найден в localStorage.");
    }

    console.log(ids)

    const {data: portfolioCoins, isLoading, isError} = useQuery({
        queryKey: ['coinData', ids],
        queryFn: () => getDataAndUpdateState(ids.join(',')),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });

    

    useEffect(() => {
        if (storedPortfolioJSON && portfolioCoins) {
            const loadedPortfolio = JSON.parse(storedPortfolioJSON);
    
            let totalPrice = 0;

            portfolioCoins.forEach((portfolioCoin: Coin) => {
                totalPrice += (+portfolioCoin.priceUsd * (loadedPortfolio.find((item: PortfolioCoin) => 
                item.id === portfolioCoin.id)?.coinquantity || 0));
            });
            setPortfolioTotalPrice(totalPrice)
    
            const sumArray = (arr: number[]) => {
                return arr.reduce((total, current) => total + current, 0);
            };

            let totalPricePurchase = 0;
            loadedPortfolio.forEach((coin: PortfolioCoin) => {
                const coinTotalPrice = sumArray((coin.priceAtTimeOfPurchase ));
                totalPricePurchase += coinTotalPrice;
            });
            console.log(totalPricePurchase)
    
            const priceDifference = totalPrice - totalPricePurchase;
    
            // Определение знака разницы
            const sign = priceDifference >= 0 ? '+' : '-';
    
            // Получение абсолютной разницы
            const absoluteDifference = Math.abs(priceDifference);
            setPercent(formatNumber((+absoluteDifference)/(+totalPrice)*100))
            // Форматирование разницы
            setFormattedDifference(`${sign}${formatNumber(absoluteDifference)}`);
        }
    }, [storedPortfolioJSON, portfolioCoins, formattedDifference, portfolioTotalPrice])

    
    return (
        <div>
            {isLoading && <Loader />}
            {isError && <Error />}
            {portfolioCoins && (
                <>
                    <div className={styles.portfolio} onClick={() => (setPortfolioModalVisible(true))}>
                        <div>
                            {formatNumber(portfolioTotalPrice)} USD
                            {formattedDifference}
                            ({percent}%)
                        </div>
                    </div>
                    <PortfolioModal
                        totalPrice={formatNumber(portfolioTotalPrice)}
                        show={portfolioModalVisible}
                        onHide={() => setPortfolioModalVisible(false)}
                        portfolioCoins={portfolioCoins}
                    />
                </>
            )}
        </div>
        
    )
}

export default Portfolio