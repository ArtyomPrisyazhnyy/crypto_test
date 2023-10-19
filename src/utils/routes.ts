import CoinPage from "../pages/CoinPage/CoinPage";
import HomePage from "../pages/HomePage/HomePage";
import { COIN_INFO, HOME_ROUTE } from "./consts";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: COIN_INFO + ':id',
        Component: CoinPage
    }
]