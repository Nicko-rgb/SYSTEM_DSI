import './cabeza.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../IMG/logo.png'
import { IoExitOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import EstadoSesion from '../Formularios/Sesion';
import useLogout from '../Inicio/useLogout';

const Cabeza = () => {

    const { isLoggedIn, handleLogout, userId, rutaPerfil } = EstadoSesion();
    const handleLogoutAndReload = useLogout(handleLogout);
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

    const handleImageError = () => {
        setImgError(true); // Cambia el estado si hay un error al cargar la imagen
    };

    return (
        <div className="cabeza">
            <Link to='/' title="D'SYSTEM BLOG">
                <img src={logo} alt="logo" />
            </Link>
            {!isLoggedIn ? (
                <Link to='/login' className='bbt'>
                    <button className='btnLogin'>Iniciar Sesión</button>
                </Link>
            ) : (
                <div>
                    <IoExitOutline onClick={handleLogoutAndReload} className='salirUser'/>
                    <Link to={`${rutaPerfil}`} className="perfilUser">
                        {imgError || !usuario?.fotoPerfil?.path ? ( // Uso del operador de encadenamiento opcional
                            <FaUserCircle className='ico_user' />
                        ) : (
                            <img
                                src={usuario.fotoPerfil.path}
                                alt="Foto de perfil"
                                onError={handleImageError} // Maneja el error de carga de la imagen
                            />
                        )}
                    </Link>
                </div>
            )}

        </div>
    )
}

export default Cabeza