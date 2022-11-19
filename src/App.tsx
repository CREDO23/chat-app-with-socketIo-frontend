import Routes from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from '../src/store/hooks/index';
import { useEffect, useCallback } from 'react';
import { useContext } from 'react';
import socketContext from './context/index';

function App() {
    const user = useAppSelector((state) => state.currentUser.user);

    const io = useContext(socketContext);

    const connection = useCallback(() => {
        if (user) {
            io?.connect(user._id as string, 'http://localhost:5500');
        }
    }, [user]);

    useEffect(() => {
        connection();
    }, []);
    return (
        <div className="w-[100vw] h-[100vh] font-Poppins  flex items-center justify-center flex-col">
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default App;
