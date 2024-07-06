import './Inicio.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from 'react-icons/fa';
import { IoMdPhotos } from "react-icons/io";
import Navegador from '../Navegador/Navegador';
import Coding from './Coding';

import aa from '../../IMG/dev1.png';
import bb from '../../IMG/studentInformatica.jpeg';
import cc from '../../IMG/std2.jpg';


const Inicio = () => {

    //codigo de efecto de escritura de bienvenida
    const [bienvenida, setBienvenida] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const tituloTexto = `LOS DESARROLLADORES DE D'SYSTEM BLOG TE DAN LA BIENVENIDA`;

        const interval = setInterval(() => {
            setBienvenida(tituloTexto.slice(0, index + 1));
            setIndex(index + 1);
        }, 50);

        return () => clearInterval(interval);
    }, [index]);

    //codigo para efecto zoom de main
    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        setZoom(true);
    }, []);

    //codigo para dar estilo a las img 
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inicio">
            <Navegador className="navegador" />
            <FaBarsStaggered className='icoNav' />
            <nav className='navHidde'>
                <Link to='/login' className='linkHidde'><FiLogIn /> Incias Sesion</Link>
                <Link to='/login' className='linkHidde'><FaUserPlus />Registrarse</Link>
                <Link to='/login' className='linkHidde'><IoMdPhotos />Ver Galeria</Link>
            </nav>
            <main className={zoom ? 'loaded' : ''}>
                <h3 className='bienvenida'>{bienvenida} </h3>
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
                    <Coding />
                </div>
                <div className="img">
                    <img
                        src={[aa, bb, cc][currentIndex]}
                        alt={`Imagen ${currentIndex}`}
                        className="image-slide"
                    />
                </div>
            </main>
        </div>
    );
};

export default Inicio;