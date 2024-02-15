import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getCoinById } from '../../api/api';
import { formatNumber } from '../../utils/formatNumber';
import CoinChart from '../../components/CoinChart/CoinChart';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

import CoinSVG from '../../assets/img/coin.svg';
import { HOME_ROUTE } from '../../utils/consts';
import Header from '../../components/Header/Header';
import { getPortfolioFromLS, savePortfolioToLS } from '../../utils/localStorage';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import AddModal from '../../components/AddModal/AddModal';
import './CoinPage.scss';

const CoinPage: React.FC = () => {
    const { id } = useParams();

    const queryClient = useQueryClient();

    const [addCoinValue, setAddCoinValue] = useState<string>('');
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

    const {
        data: coinData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['coinData'],
        queryFn: () => getCoinById(id),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    let loadedPortfolio = getPortfolioFromLS();

    const addCoin = () => {
        if (id) {
            const newCoin = {
                id,
                coinquantity: parseFloat(addCoinValue),
                totalPriceAtTimeOfPurchase: parseFloat(coinData.priceUsd),
            };

            loadedPortfolio.push(newCoin);
            savePortfolioToLS(loadedPortfolio);

            queryClient.invalidateQueries('coinData');
        }
    };

    const imageUrl =
        coinData && coinData.symbol
            ? `https://assets.coincap.io/assets/icons/${coinData.symbol.toLowerCase()}@2x.png`
            : CoinSVG;

    return (
        <div className="coin__container">
            <Header />
            <div className="coin_info">
                <Link className="coin_info__back" to={HOME_ROUTE}>
                    Back
                </Link>
                <div className="wrapper">
                    {isLoading ? (
                        <Loader />
                    ) : isError ? (
                        <Error />
                    ) : (
                        coinData && (
                            <>
                                <aside>
                                    <div className="coin_info__name">
                                        <img
                                            src={imageUrl}
                                            alt={coinData.symbol}
                                            height="24"
                                            width="24"
                                            onError={(e) => (e.currentTarget.src = CoinSVG)}
                                        />
                                        {coinData.name} ({coinData.symbol})
                                    </div>

                                    <div className="coin_info__stat">
                                        Supply: {formatNumber(parseFloat(coinData.supply))}
                                    </div>

                                    <div className="coin_info__stat">
                                        Price: ${formatNumber(parseFloat(coinData.priceUsd))}
                                    </div>

                                    <div className="coin_info__stat">
                                        Market Cap:{' '}
                                        {formatNumber(parseFloat(coinData.marketCapUsd))}
                                    </div>

                                    <div className="coin_info__stat">
                                        Volume (24Hr):{' '}
                                        {formatNumber(parseFloat(coinData.volumeUsd24Hr))}
                                    </div>

                                    <div className="coin_info__stat">
                                        Vwap (24Hr): {formatNumber(parseFloat(coinData.vwap24Hr))}
                                    </div>

                                    <div className="coin_info__stat">
                                        Change (24Hr):{' '}
                                        {parseFloat(coinData.changePercent24Hr) > 0 ? '+' : ''}
                                        {formatNumber(parseFloat(coinData.changePercent24Hr))}%
                                    </div>

                                    <div className="addToPortfolio">
                                        <Button
                                            onClick={() => setAddModalVisible(true)}
                                            variant="add-button">
                                            Buy Coin
                                        </Button>
                                        <Modal
                                            show={addModalVisible}
                                            onHide={() => setAddModalVisible(false)}>
                                            <AddModal
                                                addCoin={addCoin}
                                                addCoinValue={addCoinValue}
                                                setAddCoinValue={setAddCoinValue}
                                            />
                                        </Modal>
                                    </div>
                                </aside>

                                <div className="chart">
                                    <CoinChart />
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoinPage;
