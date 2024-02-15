import React, { useEffect, useState } from 'react';
import { getAllCoinData } from '../../api/api';
import { useQuery } from 'react-query';
import CoinList from '../../components/CoinTable/CoinList';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Pagination from '../../components/Pagination/Pagination';
import Options from '../../components/Options/Options';
import { ISortOptions } from '../../types/sortOptions';
import './HomePage.scss';

const HomePage: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState('');
    const limit = 11;

    useEffect(() => {
        setPage(0);
    }, [searchValue]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['coins', page, searchValue],
        queryFn: () => getAllCoinData(limit, page * 10, searchValue),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const displayCoins = data ? data.slice(0, 10) : [];
    const hasMoreCoins = data && data.length > 10;

    const sortOptions: ISortOptions[] = [
        { value: 'price', label: 'Price' },
        { value: 'marketCap', label: 'Market Cap' },
        { value: 'changePercent', label: 'Change (24Hr)' },
    ];
    const defaultSortField: ISortOptions['value'] = sortOptions[0].value;

    const [sortField, setSortField] = useState<ISortOptions['value']>(defaultSortField);

    const next = () => {
        if (hasMoreCoins) {
            setPage(page + 1);
        }
    };
    const prev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <main className="homepage">
            {isLoading && <Loader />}
            {isError && <Error />}
            {!isLoading && data && (
                <>
                    <Header />
                    <Options
                        searchValue={searchValue}
                        setSearchValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchValue(e.target.value)
                        }
                        sortField={sortField}
                        setSortField={setSortField}
                        sortOptions={sortOptions}
                    />
                    <CoinList coins={displayCoins} sortField={sortField} />
                    <Pagination page={page} next={next} prev={prev} hasMore={hasMoreCoins} />
                </>
            )}
        </main>
    );
};

export default HomePage;
