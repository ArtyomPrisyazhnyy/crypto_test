import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import { publicRoutes } from './utils/routes';
import Header from './components/Header/Header';


function App() {
    return (
        <>
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
            </Routes>
        </>
    );
}

export default App;
