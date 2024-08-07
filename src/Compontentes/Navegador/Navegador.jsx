// Componente Navegador.js
import './navegador.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from '../../IMG/logo.png';
import { IoHome } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { TbInfoCircleFilled } from "react-icons/tb";
import { FaNewspaper } from "react-icons/fa6";
import EstadoSesion from '../Formularios/Sesion';
import { FaChalkboardTeacher, FaUserCircle } from "react-icons/fa";

const Navegador = () => {
    const { isLoggedIn, userId, rutaPerfil} = EstadoSesion();
    const [usuario, setUsuario] = useState(null);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://backend-systemblog-production.up.railway.app/api/users/${userId}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Recargar la ruta de publicaciones
    const recargarPublicacion = () => {
        window.location.href = '/publicacion';
    };

    const handleImageError = () => {
        setImgError(true); // Cambia el estado si hay un error al cargar la imagen
    };

    return (
        <div className='navegador'>
            <div className="subnav">
                <Link to='/' className='logo1'>
                    <img src={logo} alt="logo" onClick={() => window.location.href = "/"} />
                </Link>
                <nav>
                    <Link className="link link1" to='/'><IoHome className='navIco' /> Inicio</Link>
                    <Link className="link link2" to='/publicacion' onClick={recargarPublicacion}><MdOutlinePublic className='navIco' /> Publicaciones</Link>
                    <Link className="link link3" to='/dsi'><TbInfoCircleFilled className='navIco' /> DSI</Link>
                    <Link className='link link5' to='/dsi/docentes'><FaChalkboardTeacher className='navIco' /> Docentes </Link>
                    <Link className="link link4" to='/periodico_mural'><FaNewspaper className='navIco' /> P. Mural</Link>
                </nav>
                <div>
                    {!isLoggedIn ? (
                        <Link to='/login' className='bbt'>
                            <button className='btnLogin'>Iniciar Sesión</button>
                        </Link>
                    ) : (
                        <Link to={`${rutaPerfil}`} className="perfilUser">
                            {imgError || !usuario?.fotoPerfil?.path ? ( // Uso del operador de encadenamiento opcional
                                <FaUserCircle className='ico_user'/>
                            ) : (
                                <img
                                    src={usuario.fotoPerfil.path}
                                    alt="Foto de perfil"
                                    onError={handleImageError} // Maneja el error de carga de la imagen
                                />
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navegador;