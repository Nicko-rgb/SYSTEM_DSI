import './Inicio.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from 'react-icons/fa';
import { IoMdPhotos } from "react-icons/io";

import Navegador from '../Navegador/Navegador';
import Cabeza from '../Navegador/Cabeza';
import EstadoSesion from '../Formularios/Sesion';
import useLogout from './useLogout';

import fondo1 from '../../IMG/std2.jpg';
import fondo3 from '../../IMG/studentInformatica.jpeg';
import fondo4 from '../../IMG/Suiza.jpg';
import logodsi from '../../IMG/logodsi.png';

const Inicio = () => {
    const { userName, isLoggedIn, handleLogout } = EstadoSesion();
    const handleLogoutAndReload = useLogout(handleLogout);

    const [bienvenida, setBienvenida] = useState('');
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true); // State to track loading
    const [fondoImagen, setFondoImagen] = useState(0);
    const fondos = [fondo1, fondo3, fondo4];

    useEffect(() => {
        const tituloTexto = `Los Desarrolladores de D'SYSTEM BLOG te Dan la Bienvenida`;
        const interval = setInterval(() => {
            setBienvenida(tituloTexto.slice(0, index + 1));
            setIndex(index + 1);
        }, 20);
        return () => clearInterval(interval);
    }, [index]);

    // Preload images
    useEffect(() => {
        const preloadImages = (images) => {
            return Promise.all(images.map((image) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = image;
                    img.onload = resolve; // Resolve when the image is loaded
                });
            }));
        };

        preloadImages(fondos).then(() => {
            setLoading(false); // Set loading to false when all images are loaded
        });
    }, [fondos]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFondoImagen((prevIndex) => (prevIndex + 1) % fondos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [fondos.length]);

    return (
        <div className="inicio" style={{
            backgroundImage: loading ? 'none' : `url(${fondos[fondoImagen]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <Cabeza />
            <Navegador className="navegador" />
            <FaBarsStaggered className='icoNav' />
            <nav className='navHidde'>
                <Link to='/login' className='linkHidde'><FiLogIn />Inciar Sesion</Link>
                <Link to='/login' className='linkHidde'><FaUserPlus />Registrarse</Link>
                <Link to='/login' className='linkHidde'><IoMdPhotos />Ver Galeria</Link>
            </nav>
            <main>
                {!isLoggedIn && (
                    <p className='bienvenida underline-animation'>{bienvenida} </p>
                )}
                {isLoggedIn && (
                    <p className='bienvenida underline-animation'>Bienvenido/a {userName}</p>
                )}
                <div className='content'>
                    <div className="subContent">
                        <div className="subContent2">
                            <p className='insti'>INSTITUTO DE EDUCACION SUPERIOR TECNOLOGICO PUBLICO SUIZA</p>
                            <h1 className='des'>DESARROLLO DE SISTEMAS DE INFORMACION</h1>
                            <p>Cada línea que escribes tiene el poder de transformar ideas en realidad, optimizar procesos y mejorar
                                vidas. Sé el artífice de soluciones que dejan huella en el mundo digital.
                                Únete a una comunidad global de desarrolladores apasionados que construyen el futuro, uno commit a
                                la vez.
                            </p>
                        </div>
                        <div className="new_public">
                            <img src={logodsi} alt="" />
                        </div>
                    </div>
                    <div className="box-butons">
                        {!isLoggedIn && (
                            <div className="butons1">
                                <button className="btn1" onClick={() => window.location.href = "/register"}>REGISTRATE</button>
                                <button className="btn2" onClick={() => window.location.href = "/login"}>INICIAR SESION</button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="butons2">
                                <button onClick={() => handleLogoutAndReload()}>CERRAR SESIÓN</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inicio;