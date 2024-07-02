
import './navegador.css'
import { Link } from "react-router-dom"
import logo from '../../IMG/logo.png'
const Navegador = () => {
    return (
        <div className='navegador'>
            <div className="subnav">
                <img src={logo} alt="logo" />
                <nav>
                    <Link className="link" to='/'>Inicio</Link>
                    <Link className="link" to='/publicacion'>Publicaciones</Link>
                    <Link className="link" to='/dsi'>DSI</Link>
                    <Link className="link" to='/periodico_mural'>P .Mural</Link>
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