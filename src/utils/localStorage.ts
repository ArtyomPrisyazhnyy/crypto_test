import { LSPortfolioData } from '../types/LocalStorageData';

const userPortfolioKey = 'userPortfolio';

export const savePortfolioToLS = (data: LSPortfolioData) => {
    localStorage.setItem(userPortfolioKey, JSON.stringify(data));
};

// Функция для получения данных из localStorage
export const getPortfolioFromLS = () => {
    const data = localStorage.getItem(userPortfolioKey);
    return data ? JSON.parse(data) : [];
};

export const removePortfoilioCoinfromLS = (coinIdToRemove: string) => {
    const data = getPortfolioFromLS();

    const updatedData = data.filter((coin: any) => coin.id !== coinIdToRemove);

    savePortfolioToLS(updatedData);
};
