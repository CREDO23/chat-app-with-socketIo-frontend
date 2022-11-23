import Routes from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

function App() {
    return (
        <div className="w-[100vw] h-[100vh] font-Poppins  flex items-center justify-center flex-col">
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default React.memo(App);
