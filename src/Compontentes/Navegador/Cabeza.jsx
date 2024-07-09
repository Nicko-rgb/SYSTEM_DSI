import './cabeza.css'
import { Link } from 'react-router-dom'
import logo from '../../IMG/logo.png'
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import EstadoSesion from '../Formularios/Sesion';

const Cabeza = () => {

    const { isLoggedIn } = EstadoSesion();

    return (
        <div className="cabeza">
            <Link to='/' title="D'SYSTEM BLOG">
                <img src={logo} alt="logo" />
            </Link>
            {!isLoggedIn && (
                <Link to='/register'>
                    <button>Sing In</button>
                </Link>
            )}
            {isLoggedIn && (
                <div>
                    <Link to='/' className="salirUser">
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