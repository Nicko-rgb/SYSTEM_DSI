import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Compontentes/Inicio/inicio';
import Publicaciones from './Compontentes/Publicaciones/publicaciones';
import Dsi from './Compontentes/Dsi_component/Acerca/Dsi';
import Mural from './Compontentes/Mural/Mural';
import RegistroUser from './Compontentes/Formularios/registro';
import Login from './Compontentes/Formularios/inicioSesion';
import Biblioteca from './Compontentes/Dsi_component/Biblioteca/Biblioteca';
import Docentes from './Compontentes/Dsi_component/Docentes/Docentes';
import Modulos from './Compontentes/Dsi_component/Modulos/Modulos';
import Beneficios from './Compontentes/Dsi_component/Beneficios/Beneficios';
import Developers from './Compontentes/Dsi_component/Developers/Developers';
import CursorEffect from './CursorEfect/CursorEfect';
import Perfil from './Compontentes/Perfil/Perfil';

function App() {
    return (
        <div className="App">
            <CursorEffect />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/publicacion" element={<Publicaciones />} />
                    <Route path="/dsi" element={<Dsi />} />
                    <Route path="/periodico_mural" element={<Mural  />} />

                    <Route path="/register" element={<RegistroUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user/perfil s" element={<Perfil />} />

                    <Route path="/dsi/docentes" element={<Docentes />} />
                    <Route path="/dsi/modulos" element={<Modulos />} />
                    <Route path="/dsi/biblioteca" element={<Biblioteca />} />
                    <Route path="/dsi/beneficios" element={<Beneficios />} />
                    <Route path="/dsi/developers" element={<Developers />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
