import React from 'react';
import { ICoin } from '../../types/Coin';
import { useQuery } from 'react-query';
import { getCoinForHeader } from '../../api/api';
import Portfolio from '../Portfolio/Portfolio';
import TopCoin from '../TopCoin/TopCoin';
import './Header.scss';

const Header: React.FC = () => {
    const { data: headerInfo, isError } = useQuery<ICoin[] | undefined>({
        queryKey: ['headerCoins'],
        queryFn: () => getCoinForHeader(),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    return (
        <header className="header">
            <TopCoin headerInfo={headerInfo} isError={isError} />
            <Portfolio />
        </header>
    );
};

export default Header;
