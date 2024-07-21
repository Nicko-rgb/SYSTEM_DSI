import './Inicio.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from 'react-icons/fa';
import { IoMdPhotos } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { TbCopyCheckFilled } from "react-icons/tb";

import Navegador from '../Navegador/Navegador';
import Cabeza from '../Navegador/Cabeza';
import EstadoSesion from '../Formularios/Sesion';
import useLogout from './useLogout';

import aa from '../../IMG/dev1.png';
import bb from '../../IMG/studentInformatica.jpeg';
import cc from '../../IMG/std2.jpg';

const Inicio = () => {
    const { userName, isLoggedIn, handleLogout } = EstadoSesion();


    //para cambiar estado de Incio de sesion
    const handleLogoutAndReload = useLogout(handleLogout);

    //codigo de efecto de escritura de bienvenida
    const [bienvenida, setBienvenida] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const tituloTexto = `LOS DESARROLLADORES DE D'SYSTEM BLOG TE DAN LA BIENVENIDA`;

        const interval = setInterval(() => {
            setBienvenida(tituloTexto.slice(0, index + 1));
            setIndex(index + 1);
        }, 10);

        return () => clearInterval(interval);
    }, [index]);

    //codigo para efecto zoom de main
    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        setZoom(true);
    }, []);

    //codigo para dar estilo a las img 
    const [imagenIndex, setImagenIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImagenIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    //codigo para escritura de codigo ejemplo
    const [code, setCode] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const codeExample =
        `  1   import Data from './data.js'
  2   const Coding = (data) => {
  3       const User = {
  4           name: 'Juan',
  5           email: 'juan54@gmail.com',
  6           age: 30,
  7       }
  8       Data.push(User)
  9       console.log(Data)
  10  }`;

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < codeExample.length) {
                setCode(codeExample.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }
            //este codigo para que vuelva a repetir
            // else {
            //     setCurrentIndex(0);
            // }
        }, 40);

        return () => clearInterval(interval);
    }, [currentIndex, codeExample]);

    //codigo para copiar texto de "code"
    const [copyText, setCopyText] = useState(false);
    const copiarCode = () => {
        setCopyText(true)
        navigator.clipboard.writeText(code);
    };
    const cerrarCopiar = () => {
        setCopyText(false)
    }

    return (
        <div className="inicio">
            <Cabeza />
            <Navegador className="navegador" />
            <FaBarsStaggered className='icoNav' />
            <nav className='navHidde'>
                <Link to='/login' className='linkHidde'><FiLogIn /> Incias Sesion</Link>
                <Link to='/login' className='linkHidde'><FaUserPlus />Registrarse</Link>
                <Link to='/login' className='linkHidde'><IoMdPhotos />Ver Galeria</Link>
            </nav>
            <main className={zoom ? 'loaded' : ''}>
                {!isLoggedIn && (
                    <h3 className='bienvenida'>{bienvenida} </h3>
                )}
                {isLoggedIn && (
                    <h3 className='bienvenida'>Bienvenido/a {userName}</h3>
                )}
                <div className='contend'>
                    <h3>NSTITUTO DE EDUCACION SUPERIOR TECNOLOGICO PUBLICO SUIZA</h3>
                    <h1>DESARROLLO DE SISTEMAS DE INFORMACION</h1>
                    <p>Cada línea que escribes tiene el poder de transformar ideas en realidad, optimizar procesos y mejorar
                        vidas. Sé el artífice de soluciones que dejan huella en el mundo digital.
                        Únete a una comunidad global de desarrolladores apasionados que construyen el futuro, uno commit a
                        la vez.
                    </p>
                    <div className="butons">
                        {!isLoggedIn && (
                            <div className="butons">
                                <button className="btn1" onClick={() => window.location.href = "/register"}>REGISTRATE</button>
                                <button className="btn2" onClick={() => window.location.href = "/login"}>INICIA SESION</button>
                            </div>
                        )}
                        {isLoggedIn && (
                            <div className="butons">
                                <Link to='/'>
                                    <button onClick={() => handleLogoutAndReload()}>CERRAR SESIÓN</button>
                                </Link>
                            </div>
                        )}

                    </div>
                    <div className="code-example">
                        <pre>
                            <code>{code}<span>|</span></code>
                        </pre>
                        {!copyText && (
                            <button onClick={copiarCode}>
                                <IoCopyOutline />
                            </button>
                        )}
                        {copyText && (
                            <button onClick={cerrarCopiar}>
                                <TbCopyCheckFilled />
                            </button>
                        )}
                    </div>
                </div>
                <div className="img">
                    <img
                        src={[aa, bb, cc][imagenIndex]}
                        alt="imagen"
                        className="image-slide"
                    />
                </div>
            </main>
        </div>
    );
};

export default Inicio;