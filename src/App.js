import './App.css';
import Inicio from './Compontentes/Inicio/inicio';
import Publicaciones from './Compontentes/Publicaciones/publicaciones';
import Dsi from './Compontentes/Dsi_component/Acerca/Dsi';
import Mural from './Compontentes/Mural/Mural';

import Biblioteca from './Compontentes/Dsi_component/Biblioteca/Biblioteca'
import Docentes from './Compontentes/Dsi_component/Docentes/Docentes'
import Modulos from './Compontentes/Dsi_component/Modulos/Modulos'
import Beneficios from './Compontentes/Dsi_component/Beneficios/Beneficios'


import logoSuiza from './IMG/logoSuiza.png';
import logoDSI from './IMG/lododsi.png';

import { GoHome } from "react-icons/go";
import { FaUserFriends, FaInfoCircle, FaRegNewspaper } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/publicacion" element={<Publicaciones  className="icons"/>} />
                    <Route path="/dsi" element={<Dsi />} />
                    <Route path="/periodico_mural" element={<Mural  className="icons"/>} />


                    <Route path='/dsi/docentes' element={<Docentes />} />
                    <Route path='/dsi/modulos' element={<Modulos />} />
                    <Route path='/dsi/biblioteca' element={<Biblioteca />} />
                    <Route path='/dsi/beneficios' element={<Beneficios />} />
                </Routes>
                <div className='cabecera'>
                    <img className='Imagen_Logo_Suiza imgLogo' alt='' src={logoSuiza}></img>
                    <div className='barraNav'>
                        <h2>D'SYSTEM BLOG</h2>
                        <div className='barraLinks'>
                            <Link className='linkRuta' to="/"><GoHome  className="icons"/> HOME</Link>
                            <Link className='linkRuta' to="/publicacion"><FaUserFriends  className="icons"/> Publicacion </Link>
                            <Link className='linkRuta' to="/dsi"><FaInfoCircle className="icons"/> DSI</Link>
                            <Link className='linkRuta' to="/periodico_mural"><FaRegNewspaper className="icons"/>Periodico Mural</Link>
                        </div>
                    </div>
                    <img className='Imagen_Logo_Dsi imgLogo' alt='' src={logoDSI} ></img>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;