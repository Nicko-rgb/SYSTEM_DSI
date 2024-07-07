
import './navegador.css'
import { Link } from "react-router-dom"
import logo from '../../IMG/logo.png'
import { IoHome } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { TbInfoCircleFilled } from "react-icons/tb";
import { FaNewspaper } from "react-icons/fa6";

const Navegador = () => {
    return (
        <div className='navegador'>
            <div className="subnav">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
                <nav>
                    <Link className="link link1" to='/'><IoHome className='navIco'/> Inicio</Link>
                    <Link className="link link2" to='/publicacion'><MdOutlinePublic className='navIco'/> Publicaciones</Link>
                    <Link className="link link3" to='/dsi'><TbInfoCircleFilled className='navIco'/> DSI</Link>
                    <Link className="link link4" to='/periodico_mural'><FaNewspaper className='navIco'/> P. Mural</Link>
                </nav>
                <div>
                    <Link to='/login'>
                        <button>Iniciar Sesión</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navegador