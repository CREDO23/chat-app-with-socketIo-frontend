import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { Provider } from 'react-redux';
import store from './store/store';
import SocketContext from '../src/context/index';
import { SocketIO } from '../src/context/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <SocketContext.Provider value={new SocketIO()}>
                <App />
            </SocketContext.Provider>
        </Provider>
    </React.StrictMode>,
);
