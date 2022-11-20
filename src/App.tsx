import Routes from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from '../src/store/hooks/index';
import { useEffect, useCallback } from 'react';
import { useContext } from 'react';
import socketContext from './context/index';
import React from 'react';

function App() {
    const user = useAppSelector((state) => state.currentUser.user);

    const io = useContext(socketContext);

    const connection = useCallback(
        () => io?.connect(user?._id as string, 'http://localhost:5500'),
        [user],
    );

    useEffect(() => {
        connection();
    }, [user]);

    return (
        <div className="w-[100vw] h-[100vh] font-Poppins  flex items-center justify-center flex-col">
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default React.memo(App);
