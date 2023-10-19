import React, { useEffect, useState } from 'react';
import { getAllCoinData } from '../../api/api';
import { useQuery } from 'react-query';
import { Coin } from '../../types/Coin';
import CoinList from '../../components/CoinTable/CoinList';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

import styles from './HomePage.module.scss'
import Pagination from '../../components/Pagination/Pagination';
import Options from '../../components/Options/Options';
import Portfolio from '../../components/Portfolio/Portfolio';

const HomePage = () => {
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState('');
    const limit = 11;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['coins', page, searchValue], 
        queryFn: () => getAllCoinData(limit, page*10, searchValue),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });

    const displayCoins = data ? data.slice(0, 10) : [];
    const hasMoreCoins = data && data.length > 10;

    const sortOptions = [
        { value: 'price', label: 'Price' },
        { value: 'marketCap', label: 'Market Cap' },
        { value: 'changePercent', label: 'Change (24Hr)' },
    ];

    const [sortField, setSortField] = useState<string>(sortOptions[0].value);

    return (
        <main className={styles.homepage}> 
            {isLoading &&  <Loader />}
            {isError && <Error />}
            {!isLoading && data &&
            <>
                <Header />
                <Options 
                    searchValue={searchValue}  
                    setSearchValue={setSearchValue}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortOptions={sortOptions}
                />
                <CoinList 
                    coins={displayCoins}
                    sortField={sortField} 
                /> 
                <Pagination
                    page={page}
                    onPageChange={setPage}
                    hasMore={hasMoreCoins}
                />
            </>
            
            }
        </main>
    );
}

export default HomePage;