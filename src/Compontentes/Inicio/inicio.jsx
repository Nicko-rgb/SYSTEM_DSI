import './Inicio.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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

const Inicio = () => {
    const { userName, isLoggedIn, handleLogout } = EstadoSesion();
    const handleLogoutAndReload = useLogout(handleLogout);
    const [currentIndex, setCurrentIndex] = useState(0);
    const publicacionesRef = useRef(null);

    const [bienvenida, setBienvenida] = useState('');
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true); // State to track loading
    const [fondoImagen, setFondoImagen] = useState(0);
    const fondos = [fondo1, fondo3, fondo4];
    const [publicaciones, setPublicaciones] = useState([])

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

    //obtener las publicaciones
    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await axios.get('https://backend-systemblog-production.up.railway.app/api/publicaciones');
                // Ordenar las publicaciones por fecha de creación en orden descendente
                const ordenadas = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                // Obtener solo las últimas 5 publicaciones
                setPublicaciones(ordenadas.slice(0, 5));
            } catch (err) {
                console.log('Error al obtener las recientes');
            }
        };

        fetchPublicaciones();
    }, []);

    //para desplazarme por las publicaciones
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % publicaciones.length);
        }, 3000); // Cambiar cada 2 segundos

        return () => clearInterval(interval);
    }, [publicaciones.length]);

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
                    <p className='bienvenida underline-animation'>Bienvenido(a) {userName}</p>
                )}
                <button className='install'>Instalar Sitio como aplicacion</button>
                <div className='content'>
                    <div className="subContent">
                        <div className="subContent2">
                            <h2 className='insti'>INSTITUTO DE EDUCACION SUPERIOR TECNOLOGICO PUBLICO SUIZA</h2>
                            <h1 className='des'>DESARROLLO DE SISTEMAS DE INFORMACION</h1>
                            <p>Cada línea que escribes tiene el poder de transformar ideas en realidad, optimizar procesos y mejorar
                                vidas. Sé el artífice de soluciones que dejan huella en el mundo digital.
                                Únete a una comunidad global de desarrolladores apasionados que construyen el futuro, uno commit a
                                la vez.
                            </p>
                        </div>
                        <div className="new_public gradient-border">
                            <div className="publicaciones-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {publicaciones.map((datos) => (
                                    <div key={datos.id} className="box_publicaciones">
                                        <div className='box_user'>
                                            <p className='user'>{datos.userName}</p>
                                        </div>
                                        {datos.image || datos.video ? (
                                            <div className="publicArchivo">
                                                <p className='txt_descrip'>{datos.textArchivo}</p>
                                                {datos.image && (
                                                    <div className="fotoPublicacion">
                                                        <img src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.image.filename}`} alt='imagenPublic' />
                                                    </div>
                                                )}
                                                {datos.video && (
                                                    <div className="videoPublicacion">
                                                        <video controls>
                                                            <source src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.video.filename}`} type={datos.video.contentType} />
                                                        </video>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="soloTextoPublic">
                                                <h4 style={{ whiteSpace: 'pre-wrap' }}>{datos.text}</h4>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="pagination">
                                {publicaciones.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
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