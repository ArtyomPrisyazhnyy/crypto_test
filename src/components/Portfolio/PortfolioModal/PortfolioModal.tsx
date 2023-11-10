import React, { useCallback } from 'react';

import styles from './PortFolioModal.module.scss';
import { Coin } from '../../../types/Coin';
import CoinSVG from '../../../assets/img/coin.svg'
import { formatNumber } from '../../../utils/formatNumber';
import { useQueryClient } from 'react-query';
import { getPortfolioFromLS, removePortfoilioCoinfromLS } from '../../../utils/localStorage';
import { LSPortfolioData } from '../../../types/LocalStorageData';

interface PortfolioModalProps {
    show: boolean;
    onHide: () => void;
    portfolioCoins: Coin[];
    totalPrice: string
}


const PortfolioModal: React.FC<PortfolioModalProps> = ({show, onHide, portfolioCoins, totalPrice}) => {
    const queryClient = useQueryClient();

    let loadedPortfolio = getPortfolioFromLS()

    const removeCoin = useCallback((coinId: string) => {
        removePortfoilioCoinfromLS(coinId);
        queryClient.invalidateQueries('coinData');
    }, [queryClient]);

    return (
        <>
            {show && 
                <div className={styles.modal} 
                    onClick={(e) => {
                        if(e.target === e.currentTarget){
                            onHide()
                        }
                    }}>
                    <div className={styles.modal__content}>
                        <div className={styles.modal__title}>
                            Your coins
                        </div>
                        <div className={styles.modal__title}>
                            Total price: {totalPrice}
                        </div>
                        {(loadedPortfolio.length && portfolioCoins) 
                        ? 
                            <>
                            {portfolioCoins.map((portfolioCoin: any) => (
                                <div className={styles.modal__content__stat}>
                                    <div className={styles.portfolio__info}>
                                        <img 
                                            src={`https://assets.coincap.io/assets/icons/${portfolioCoin.symbol.toLowerCase()}@2x.png`} 
                                            alt=""
                                            height='24' 
                                            width='24' 
                                            onError={(e) => (e.currentTarget.src = CoinSVG)} 
                                        />
                                        <div className={styles.portfolio__desc}>{portfolioCoin.name}</div>
                                       
                                        <div className={styles.portfolio__desc}>
                                            number of coins: {loadedPortfolio.find((item: LSPortfolioData) => 
                                            item.id === portfolioCoin.id)?.coinquantity || 0}
                                        </div>
                                    </div>
                                    
                                    <button className={styles.portfolio__btn} onClick={() => removeCoin(portfolioCoin.id)}>remove</button>
                                </div>
                            ))}
                            </>
                        :  
                        <div>portfolio is empty</div>}
                            <button className={styles.portfolio__btn} onClick={onHide}>Close</button>
                    </div>
                </div>
            }
        </>
    )
}

export default PortfolioModal