// Componente Navegador.js
import './navegador.css'
import { Link } from "react-router-dom"
import logo from '../../IMG/logo.png'
import { IoHome } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { TbInfoCircleFilled } from "react-icons/tb";
import { FaNewspaper } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import EstadoSesion from '../Formularios/Sesion';

const Navegador = () => {
    const { isLoggedIn } = EstadoSesion();

    //recargan la ruta publicacion
    const recargarPublicacion = () => {
        window.location.href = '/publicacion';
    }

    return (
        <div className='navegador'>
            <div className="subnav">
                <Link to='/'>
                    <img src={logo} alt="logo" onClick={() => window.location.href = "/"}/>
                </Link>
                <nav>
                    <Link className="link link1" to='/'><IoHome className='navIco' /> Inicio</Link>
                    <Link className="link link2" to='/publicacion' onClick={recargarPublicacion}><MdOutlinePublic className='navIco' /> Publicaciones</Link>
                    <Link className="link link3" to='/dsi'><TbInfoCircleFilled className='navIco' /> DSI</Link>
                    <Link className='link link5' to='/dsi/docentes'> Docentes </Link>
                    <Link className="link link4" to='/periodico_mural'><FaNewspaper className='navIco' /> P. Mural</Link>
                </nav>
                <div>
                    {!isLoggedIn && (
                        <Link to='/login' className='bbt'>
                            <button className='btnLogin'>Iniciar Sesión</button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Link to='/user/perfil' className="perfilUser">
                            <FaRegUser />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navegador
