import '../src/scss/app.scss';
import Header from './components/Header';

import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home searchValue={searchValue} />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
