import './App.css';
import Inicio from './Compontentes/Inicio/inicio';
import Publicaciones from './Compontentes/Publicaciones/publicaciones';
import Dsi from './Compontentes/Dsi/Dsi';
import Mural from './Compontentes/Mural/Mural';
import logoDSI from './IMG/lododsi.png'
import logoSuiza from './IMG/logoSuiza.png'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/publicacion" element={<Publicaciones />} />
                    <Route path="/dsi" element={<Dsi />} />
                    <Route path="/periodico_mural" element={<Mural />} />
                </Routes>
                <div className='cabecera'>
                    <img className='Imagen_Logo_Suiza imgLogo' src={logoSuiza}></img>
                    <div className='barraNav'>
                        <h2>D'SYSTEM BLOG</h2>
                        <div className='barraLinks'>
                            <Link className='linkRuta' to="/">Inicio</Link>
                            <Link className='linkRuta' to="/publicacion">Publicacion </Link>
                            <Link className='linkRuta' to="/dsi">DSI</Link>
                            <Link className='linkRuta' to="/periodico_mural">Periodico Mural</Link>
                        </div>
                    </div>
                    <img className='Imagen_Logo_Dsi imgLogo' src={logoDSI} ></img>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;