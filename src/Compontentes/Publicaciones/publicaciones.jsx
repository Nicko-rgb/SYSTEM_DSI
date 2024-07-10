import './publicacion.css';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaHeart, FaRegShareSquare, FaPlus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import meme from '../../IMG/meme.jpg'
import texto from '../../IMG/texto.png'

import Navegador from '../Navegador/Navegador';
import Cabeza from '../Navegador/Cabeza';
import Comentarios from './Comentarios';
import UploadForm from './SubirNuevo';
import EstadoSesion from '../Formularios/Sesion';

const Publicaciones = () => {
    //verificar si el usuario inicio sesion
    const { isLoggedIn } = EstadoSesion()
    const [publicaciones, setPublicaciones] = useState([]);

    // Agrega un estado local para cada publicación
    const [showComments, setShowComments] = useState({});
    const [liked, setLiked] = useState({});
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleLike = (id) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id]
        }));
    };

    const handleComments = (id) => {
        setShowComments((prevShowComments) => ({
            ...prevShowComments,
            [id]: !prevShowComments[id]
        }));
    };

    const mostrarSubirPublic = () => {
        setShowUploadForm(true);
    };

    const cerrarSubirPublic = () => {
        setShowUploadForm(false);
    };

    //obtener las publicaciones
    useEffect(() => {
        const fechPublicacion = async () => {
            try {
                const dataPublicacion = await fetch("/api/publicaciones")
                const publicaciones = await dataPublicacion.json()
                setPublicaciones(publicaciones)

                // Inicializa los estados locales para cada publicación
                setShowComments(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
                setLiked(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
            } catch (error) {
                console.log(error)
            }
        };
        fechPublicacion();
    }, []);

    //para formatear la fecha y la hora
    const formatDate = (dateString) => {
        return moment.utc(dateString).format('DD/MM/YYYY');
    };

    const formatTime = (timeString) => {
        return moment(timeString, 'HH:mm:ss').format('HH:mm');
    };

    return (
        <div className="publicaciones">
            <Navegador />
            <Cabeza />
            <main className="subPubli">
                {!isLoggedIn && (
                    <div className="noLogueado">
                        <h2>Para subir publicaciones debes iniciar sesión</h2>
                        <button onClick={() => window.location.href = "/login"}>INICIA SESION</button>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="subirNuevo">
                        <img src={texto} alt="" />
                        <div onClick={mostrarSubirPublic}>
                            <input type="text" placeholder='Escribe Aquí' />
                            <FaPlus className='iconPlus' />
                        </div>
                    </div>
                )}
                {showUploadForm && (
                    <UploadForm cerrarSubir={cerrarSubirPublic} />
                )}

                {[...publicaciones].reverse().map((datos) => (
                    <div className="content-publicacion" key={datos._id}>
                        <header>
                            <i className="fa fa-user"></i>
                            <div className="datoUser">
                                <h3>{datos.userName} </h3>
                                <div>
                                    <p> {formatDate(datos.createdAtDate)} </p>
                                    <p> {formatTime(datos.createdAtTime)} </p>
                                </div>
                            </div>
                            <SlOptionsVertical className='ico-publiAction' />
                            <div className='accionPubli'>
                                <p>Denuncia</p>
                                <p>Ver la Publicacion</p>
                                <p>Informacion</p>
                                <p>Borrar Publicacion</p>
                            </div>
                        </header>
                        <p className='descrip'> {datos.text} </p>
                        <div className="fotoPublicacion">
                            <img src={meme} alt="" id="myImg" />
                        </div>
                        <footer>
                            <div className={`divGusta ${liked[datos._id] ? 'liked' : ''}`} onClick={() => handleLike(datos._id)}>
                                <FaHeart className={`ico meGusta ${liked[datos._id] ? 'liked' : ''}`} />
                                <p style={{ color: 'white' }}>120 k</p>
                            </div>
                            <div className='divCompartir'>
                                <FaRegShareSquare className='ico compartir' />
                                <p>Compartir</p>
                            </div>
                            <div className={`divComentar ${showComments[datos._id] ? 'show-comments' : ''}`} onClick={() => handleComments(datos._id)}>
                                <TiMessages className='ico comentar' />
                                <p>Comentarios</p>
                            </div>
                        </footer>

                        {
                            showComments[datos._id] && (
                                <Comentarios className={`comments ${showComments[datos._id] ? 'show-comments' : ''}`} />
                            )
                        }

                        <div style={{ position: 'relative' }}>
                            <input type="text" placeholder="Comentar aquí ..." />
                            <TiMessages className='ico-comment' />
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Publicaciones;