import './App.css';
import Inicio from './Compontentes/Inicio/inicio';
import Publicaciones from './Compontentes/Publicaciones/publicaciones';
import Dsi from './Compontentes/Dsi/Dsi';
import Mural from './Compontentes/Mural/Mural';
import logoDSI from './IMG/lododsi.png'
import logoSuiza from './IMG/logoSuiza.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { GoHome } from "react-icons/go";
import { FaUserFriends, FaInfoCircle, FaRegNewspaper } from "react-icons/fa";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/publicacion" element={<Publicaciones  className="icons"/>} />
                    <Route path="/dsi" element={<Dsi />} />
                    <Route path="/periodico_mural" element={<Mural  className="icons"/>} />
                </Routes>
                <div className='cabecera'>
                    <img className='Imagen_Logo_Suiza imgLogo' src={logoSuiza}></img>
                    <div className='barraNav'>
                        <h2>D'SYSTEM BLOG</h2>
                        <div className='barraLinks'>
                            <Link className='linkRuta' to="/"><GoHome  className="icons"/> HOME</Link>
                            <Link className='linkRuta' to="/publicacion"><FaUserFriends  className="icons"/> Publicacion </Link>
                            <Link className='linkRuta' to="/dsi"><FaInfoCircle className="icons"/> DSI</Link>
                            <Link className='linkRuta' to="/periodico_mural"><FaRegNewspaper className="icons"/>Periodico Mural</Link>
                        </div>
                    </div>
                    <img className='Imagen_Logo_Dsi imgLogo' src={logoDSI} ></img>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;