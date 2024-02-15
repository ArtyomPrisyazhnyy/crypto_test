import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getDataAndUpdateState } from '../../api/api';
import { formatNumber } from '../../utils/formatNumber';
import PortfolioModal from './PortfolioModal/PortfolioModal';
import { ICoin } from '../../types/Coin';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { getPortfolioFromLS } from '../../utils/localStorage';
import Modal from '../Modal/Modal';
import './Portfolio.scss';

interface PortfolioCoin {
    id: string;
    coinquantity: number;
    totalPriceAtTimeOfPurchase: number;
}

const Portfolio: React.FC = () => {
    const [portfolioModalVisible, setPortfolioModalVisible] = useState<boolean>(false);

    const [portfolioTotalPrice, setPortfolioTotalPrice] = useState<number>(0);
    const [percent, setPercent] = useState<string>('');
    const [formattedDifference, setFormattedDifference] = useState<string>('');

    const ids: string[] = [];

    let loadedPortfolio = getPortfolioFromLS();

    if (loadedPortfolio) {
        loadedPortfolio.forEach((loadedCoinFromLS: any) => {
            if (!ids.includes(loadedCoinFromLS.id)) {
                ids.push(loadedCoinFromLS.id);
            }
        });
    }

    const {
        data: portfolioCoins,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['coinData', ids],
        queryFn: () => getDataAndUpdateState(ids.join(',')),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!ids.length,
    });

    useEffect(() => {
        if (loadedPortfolio && portfolioCoins) {
            let totalPrice = 0;
            let currentTotalPrice = 0;

            loadedPortfolio.forEach((coin: PortfolioCoin) => {
                const coinTotalPrice = coin.coinquantity * coin.totalPriceAtTimeOfPurchase;
                const currentCoinPrice =
                    portfolioCoins.find((portfolioCoin: ICoin) => portfolioCoin.id === coin.id)
                        ?.priceUsd * coin.coinquantity;
                totalPrice += coinTotalPrice;
                currentTotalPrice += currentCoinPrice;
            });

            setPortfolioTotalPrice(totalPrice);

            const priceDifference = totalPrice - currentTotalPrice;
            const sign = priceDifference >= 0 ? '+' : '-';
            const absoluteDifference = Math.abs(priceDifference);
            const percentageChange = (absoluteDifference / totalPrice) * 100;

            setPercent(formatNumber(percentageChange));
            setFormattedDifference(`${sign}${formatNumber(absoluteDifference)}`);
        }
    }, [loadedPortfolio, portfolioCoins]);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Error />
            ) : (
                <>
                    <button className="portfolio" onClick={() => setPortfolioModalVisible(true)}>
                        {loadedPortfolio?.length ? (
                            <div>
                                {formatNumber(portfolioTotalPrice)} USD
                                {formattedDifference}({percent}%)
                            </div>
                        ) : (
                            'Portfolio is empty'
                        )}
                    </button>
                    <Modal
                        show={portfolioModalVisible}
                        onHide={() => setPortfolioModalVisible(false)}>
                        <PortfolioModal
                            totalPrice={formatNumber(portfolioTotalPrice)}
                            portfolioCoins={portfolioCoins}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Portfolio;
