import './Inicio.css';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from 'react-icons/fa';
import { IoMdPhotos } from "react-icons/io";
import Navegador from '../Navegador/Navegador';
import CardImage from './CardImage';


const Inicio = () => {
    return (
        <div className="inicio">
            <Navegador />
            <FaBarsStaggered className='icoNav' />
            <nav className='navHidde'>
                <Link to='/login' className='linkHidde'><FiLogIn/> Incias Sesion</Link>
                <Link to='/login' className='linkHidde'><FaUserPlus/>Registrarse</Link>
                <Link to='/login' className='linkHidde'><IoMdPhotos/>Ver Galeria</Link>
            </nav>
            <main>
                <div>
                    <h3>INSTITUTO DE EDUCACION SUPERIOR TECNOLOGICO PUBLICO SUIZA</h3>
                    <h1>DESARROLLO DE SISTEMAS DE INFORMACION</h1>
                    <p>Cada línea que escribes tiene el poder de transformar ideas en realidad, optimizar procesos y mejorar
                        vidas. Sé el artífice de soluciones que dejan huella en el mundo digital.
                        Únete a una comunidad global de desarrolladores apasionados que construyen el futuro, uno commit a
                        la vez.
                    </p>
                    <div className="butons">
                        <Link to='/register'>
                            <button className="btn1">REGISTRATE</button>
                        </Link>
                        <Link to='/login'>
                            <button className="btn2">INICIA SESION</button>
                        </Link>
                    </div>
                </div>
                <div className="img">
                    <CardImage />
                </div>
            </main>
        </div>
    );
};

export default Inicio;