import React, { useCallback } from 'react';
import { ICoin } from '../../../types/Coin';
import CoinSVG from '../../../assets/img/coin.svg';
import { useQueryClient } from 'react-query';
import { getPortfolioFromLS, removePortfoilioCoinfromLS } from '../../../utils/localStorage';
import { LSPortfolioData } from '../../../types/LocalStorageData';
import Button from '../../Button/Button';
import './PortFolioModal.scss';

export interface PortfolioModalProps {
    portfolioCoins: ICoin[];
    totalPrice: string;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ portfolioCoins, totalPrice }) => {
    const queryClient = useQueryClient();

    let loadedPortfolio = getPortfolioFromLS();

    const removeCoin = useCallback(
        (coinId: string) => {
            removePortfoilioCoinfromLS(coinId);
            queryClient.invalidateQueries('coinData');
        },
        [queryClient],
    );

    const coinQuantityById: { [id: string]: number } = loadedPortfolio.reduce(
        (accumulator: { [id: string]: number }, coin: LSPortfolioData) => {
            if (accumulator[coin.id]) {
                accumulator[coin.id] += coin.coinquantity;
            } else {
                accumulator[coin.id] = coin.coinquantity;
            }
            return accumulator;
        },
        {},
    );

    return (
        <>
            <div className="modal__title">Your coins</div>
            <div className="modal__title">Total price: {totalPrice}</div>
            {loadedPortfolio.length && portfolioCoins ? (
                <>
                    {portfolioCoins.map((portfolioCoin: ICoin) => (
                        <div key={portfolioCoin.id} className="modal__content__stat">
                            <div className="portfolio__info">
                                <img
                                    src={`https://assets.coincap.io/assets/icons/${portfolioCoin.symbol.toLowerCase()}@2x.png`}
                                    alt=""
                                    height="24"
                                    width="24"
                                    onError={(e) => (e.currentTarget.src = CoinSVG)}
                                />
                                <div className="portfolio__desc">{portfolioCoin.name}</div>

                                <div className="portfolio__desc portfolio__quantity">
                                    number of coins: {coinQuantityById[portfolioCoin.id] || 0}
                                </div>
                            </div>

                            <Button
                                variant="remove-button"
                                onClick={() => removeCoin(portfolioCoin.id)}>
                                remove
                            </Button>
                        </div>
                    ))}
                </>
            ) : (
                <div className="portfolio__empty">portfolio is empty</div>
            )}
        </>
    );
};

export default PortfolioModal;
