import { Route, Routes } from 'react-router-dom';
import Connexion from '../screens/Connexion';
import Home from '../screens/Home';


export default function (): JSX.Element {
  
    return (
        <Routes>
            
            <Route path="/" element={<Connexion />} />

            <Route path="/home" element={<Home />} />
        </Routes>
    );
}
