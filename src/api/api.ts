import axios from 'axios';

export const $host = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

export const getAllCoinData = async (limit: number, offset: number, search?: string)  => {
    try {
        const {data} = await $host.get(``, {
            params: {
                limit,
                offset,
                search
            }
        });
        return data.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCoinForHeader = async () => {
    try {
        const  {data} = await $host.get(`?limit=3`);
        return data.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCoinById = async (id: string | undefined) => {
    try {
        const {data} = await $host.get(`/${id}`);
        return data.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCoinHistory = async (id: string | undefined, interval: string, start: number, end: number) => {
    try {
        const {data} = await $host.get(`/${id}/history`, {
            params: {
                interval,
                start,
                end
            }
        });
        return data.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getDataAndUpdateState = async (ids: string) => {
    try{
        const {data} = await $host.get(``, {
            params: {
                ids
            }
        })
        return data.data
    } catch (e) {
        console.error(e)
        throw e
    }
}
