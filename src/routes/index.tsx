import { Route, Routes } from 'react-router-dom';
import Connexion from '../screens/Connexion';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';

export default function (): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Connexion />} />

            <Route path="/home" element={<Home />} />

            <Route path='/reset-password' element={<ForgotPassword/>}/>
        </Routes>
    );
}
