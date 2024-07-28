import './cabeza.css'
import { Link } from 'react-router-dom'
import logo from '../../IMG/logo.png'
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import EstadoSesion from '../Formularios/Sesion';
import useLogout from '../Inicio/useLogout';

const Cabeza = () => {

    const { isLoggedIn, handleLogout } = EstadoSesion();
    //para cambiar estado de Incio de sesion
    const handleLogoutAndReload = useLogout(handleLogout);

    return (
        <div className="cabeza">
            <Link to='/' title="D'SYSTEM BLOG">
                <img src={logo} alt="logo" />
            </Link>
            {!isLoggedIn && (
                <Link to='/login'>
                    <button>Iniciar Sesion</button>
                </Link>
            )}
            {isLoggedIn && (
                <div>
                    <Link to='/' className="salirUser" onClick={handleLogoutAndReload}>
                        <IoExitOutline />
                    </Link>
                    <Link to='/user/perfil' className="perfilUser">
                        <FaRegUser />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cabeza