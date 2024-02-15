import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { getCoinHistory } from '../../api/api';
import { formatNumber } from '../../utils/formatNumber';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import ButtonListForSelect from '../ButtonListForSelect/ButtonListForSelect';
import './CoinChart.scss';

const CoinChart: React.FC = () => {
    const timeNow = Date.now();
    const HOUR_MS = 3600000;
    const HALF_DAY_MS = 43200000;
    const DAY_MS = 86400000;

    const { id } = useParams();
    const [selectedInterval, setSelectedInterval] =
        useState<keyof typeof timeframeUNIXLabels>('m1');

    const timeframeBTNLabels = {
        m1: '1H',
        m5: '12H',
        m15: '1D',
    };

    const timeframeUNIXLabels = {
        m1: timeNow - HOUR_MS,
        m5: timeNow - HALF_DAY_MS,
        m15: timeNow - DAY_MS,
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['coinHisrory', selectedInterval],
        queryFn: () =>
            getCoinHistory(id, selectedInterval, timeframeUNIXLabels[selectedInterval], timeNow),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const timeframeValues = Object.keys(timeframeBTNLabels) as (keyof typeof timeframeUNIXLabels)[];

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Error />}
            {data && (
                <>
                    <div className="CoinChart__select">
                        <ButtonListForSelect
                            items={timeframeValues.map((value) => ({
                                value,
                                label: timeframeBTNLabels[value],
                            }))}
                            selectedValue={selectedInterval}
                            onSelect={(value) => setSelectedInterval(value)}
                            ButtonListDescription="Interval: "
                        />
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                style={{ fontSize: '12px' }}
                                dataKey="time"
                                tickFormatter={(time) => {
                                    const date = new Date(time);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const year = date.getFullYear();
                                    const hours = String(date.getHours()).padStart(2, '0');
                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                                    return formattedDate;
                                }}
                            />

                            <YAxis
                                style={{ fontSize: '12px' }}
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(value) => `$${formatNumber(value)}`}
                            />
                            <Tooltip
                                separator={': '}
                                labelFormatter={(value) => {
                                    const date = new Date(value);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const year = date.getFullYear();
                                    const hours = String(date.getHours()).padStart(2, '0');
                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                                    return formattedDate;
                                }}
                                formatter={(value: string) => [
                                    `$${formatNumber(parseFloat(value))}`,
                                    'Price',
                                ]}
                            />

                            <Line type="monotone" dataKey="priceUsd" stroke="#e73919" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </>
    );
};

export default CoinChart;
