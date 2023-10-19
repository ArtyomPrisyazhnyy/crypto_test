import React, { useEffect, useState } from 'react'
import { CoinChartPoint } from '../../types/Coin';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { getCoinHistory } from '../../api/api';
import { formatNumber } from '../../utils/formatNumber';

import styles from './CoinChart.module.scss'
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import ButtonListForSelect from '../ButtonListForSelect/ButtonListForSelect';

export enum Timeframe{
    Day = 'm1',
    Week = 'm30',
    Month = 'h1',
    Year = 'd1',
}
  
const CoinChart = () => {
    const timeNow = Date.now();
    const DAY_MS = 86400000;
    const WEEK_MS = 604800000;
    const MONTH_MS = 2592000000;
    const YEAR_MS = 31536000000;
    const { id } = useParams();

    const timeframeLabels: Record<Timeframe, string> = {
        [Timeframe.Day]: 'minute',
        [Timeframe.Week]: 'Hоur',
        [Timeframe.Month]: 'Hour',
        [Timeframe.Year]: 'Day',
    };

    const timeframeBTNLabels: Record<Timeframe, string> = {
        [Timeframe.Day]: '1D',
        [Timeframe.Week]: '7D',
        [Timeframe.Month]: '1M',
        [Timeframe.Year]: '1Y',
    };

    const timeframeUNIXLabels = {
        [Timeframe.Day]: timeNow - DAY_MS,
        [Timeframe.Week]: timeNow - WEEK_MS,
        [Timeframe.Month]: timeNow - MONTH_MS,
        [Timeframe.Year]: timeNow - YEAR_MS,
    }


    const [selectedInterval, setSelectedInterval] = useState<Timeframe>(Timeframe.Year);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['coinHisrory', selectedInterval], 
        queryFn: () => getCoinHistory(id, selectedInterval, timeframeUNIXLabels[selectedInterval], timeNow),
        keepPreviousData: true,
        refetchOnWindowFocus: false
    });

    const timeframeValues = Object.values(Timeframe);


    return (
        <>
            {isLoading && <Loader />}
            {isError && <Error />}
            {data && (
                <>
                    <div className={styles.CoinChart__select}>
                        <ButtonListForSelect
                            items={timeframeValues.map((value) => ({
                                value,
                                label: timeframeBTNLabels[value],
                            }))}
                            selectedValue={selectedInterval}
                            onSelect={(value) => setSelectedInterval(value)}
                            ButtonListDescription='Interval: '
                        />
                    </div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis tickFormatter={(value) => (value % 70 === 0 ? value + 1 : '')} interval={1} />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                separator={": "}
                                labelFormatter={(value) => `${timeframeLabels[selectedInterval]} ${value + 1}`}
                                formatter={(value: string) => [
                                    `$${formatNumber(parseFloat(value))}`,
                                    "Price",
                                ]}
                            />
                            <Line type="monotone" dataKey="priceUsd" stroke="#e73919" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </>
                
            )}
        </>
    )
}

export default CoinChart