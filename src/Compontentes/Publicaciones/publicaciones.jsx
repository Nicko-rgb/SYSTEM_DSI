import './publicacion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaPlus, FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl"
import { CiCircleInfo } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import texto from '../../IMG/texto.png'

import Navegador from '../Navegador/Navegador';
import Cabeza from '../Navegador/Cabeza';
import Comentarios from './Comentarios';
import UploadForm from './SubirNuevo';
import EstadoSesion from '../Formularios/Sesion';
import { InfoPublicacion } from '../Complementos/InfoPublic';
import { Reporte } from '../Complementos/Reporte';

const Publicaciones = () => {
    //verificar si el usuario inicio sesion
    const { userName, isLoggedIn } = EstadoSesion()
    const [publicaciones, setPublicaciones] = useState([]);
    const [comment, setComment] = useState('');
    // Agrega un estado local para cada publicación
    const [showComments, setShowComments] = useState({});
    const [likes, setLikes] = useState({});
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [modalInfo, setModalInfo] = useState(false)
    const [modalReport, setModalReport] = useState(false)
    const [imgError, setImgError] = useState(false);
    


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
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };
    const abrirInfoClick = (publication) => {
        setSelectedPublication(publication);
        setModalInfo(true);
    };
    const cerrarInfoModal = () => {
        setModalInfo(false);
        setSelectedPublication(null);
    }
    const abrirReporteClick = (publication) => {
        setSelectedPublication(publication);
        setModalReport(true);
    }
    const cerrarReporteModal = () => {
        setModalReport(false);
        setSelectedPublication(null);
    }

    //obtener las publicaciones
    useEffect(() => {
        const fechPublicacion = async () => {
            try {
                const dataPublicacion = await fetch("https://backend-systemblog-production.up.railway.app/api/publicaciones")
                const publicaciones = await dataPublicacion.json()
                setPublicaciones(publicaciones)

                // Inicializa los estados locales para cada publicación
                setShowComments(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
            } catch (error) {
                console.log(error)
            }
        };
        fechPublicacion();
    }, []);

    //codigo para enviar comentarios de cada publicacion
    const handleCommentSubmit = async (publicacionId) => {
        try {
            // Enviar el comentario al servidor
            await fetch(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/comentar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: userName,
                    texto: comment,
                }),
            });

            // Limpiar el campo de comentario
            setComment('');

            // Opcionalmente, actualizar el estado local con la publicación actualizada
            const response = await fetch(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}`);
            const updatedPublicacion = await response.json();
            setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.map((pub) =>
                    pub._id === publicacionId ? updatedPublicacion : pub
                )
            );
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        }
    };

    //codigo para dar likes a las publicaciones
    const handleLike = async (publicacionId) => {
        try {
            // Verificar si el usuario ya ha dado like a la publicación
            const isLiked = likes[publicacionId];

            // Enviar la acción de like o unlike al servidor
            const response = await axios.post(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/like`, {
                userName: userName,
            });

            // Actualizar el estado local de likes
            setLikes((prevLikes) => ({ ...prevLikes, [publicacionId]: !isLiked })); // Alternar el estado del like

            // Actualizar el estado local de la publicación
            setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.map((pub) =>
                    pub._id === publicacionId
                        ? response.data // Usar la publicación actualizada devuelta por el servidor
                        : pub
                )
            );
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    // Código para servir los likes de cada publicación
    useEffect(() => {
        const fetchLikes = async () => {
            if (userName) {
                try {
                    const response = await axios.get(`https://backend-systemblog-production.up.railway.app/api/likes/${userName}`);

                    // Verificar si la respuesta contiene datos
                    if (response.data) {
                        // Reducir los likes a un objeto donde las claves son los IDs de las publicaciones
                        const likesData = response.data.reduce((acc, like) => {
                            acc[like.publicacionId.toString()] = true; // Asegúrate de convertir el ObjectId a string
                            return acc;
                        }, {});
                        setLikes(likesData); // Establecer el estado de likes
                    }
                } catch (error) {
                    console.error('Error al cargar los likes:', error);
                }
            }
        };

        fetchLikes();
    }, [userName]);

    const borrarPublicacion = async (publicacionId) => {
        try {
            await axios.delete(`https://backend-systemblog-production.up.railway.app/api/borrar/publicaciones/${publicacionId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Actualizar el estado de las publicaciones en el componente padre
            setPublicaciones(prev => prev.filter(pub => pub._id !== publicacionId));
            console.log('Publicación eliminada con éxito');
        } catch (error) {
            console.error('Error al eliminar la publicaciónss:', error);
        }
    }

    //formatear menos 5 horas
    const moment = require('moment-timezone'); // Asegúrate de que moment-timezone esté instalado

    const formatDate = (dateString) => {
        return moment.utc(dateString).local().format('DD/MM/YYYY');
    };

    const formatTime = (timeString) => {
        return moment.utc(timeString, 'HH:mm:ss').local().format('HH:mm');
    };

    const handleImageError = () => {
        setImgError(true); // Cambia el estado si hay un error al cargar la imagen
    };

    return (
        <div className="publicaciones">
            <Cabeza />
            <Navegador />
            <main className="subPubli">
                {!isLoggedIn && (
                    <div className="noLogueado">
                        <p> <CiCircleInfo className='noLogIco' /> Para subir publicaciones debes iniciar sesión</p>
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
                            {/* Mostrar la foto de perfil o el icono de usuario */}
                            {!imgError && datos.userId && datos.userId.fotoPerfil && datos.userId.fotoPerfil.path ? (
                                <img
                                    src={`https://backend-systemblog-production.up.railway.app/${datos.userId.fotoPerfil.path}`}
                                    alt="Foto de perfil"
                                    onError={handleImageError}
                                    className="fa fa-user" // Asegúrate de aplicar estilos para que se vea bien
                                />
                            ) : (
                                <FaUser className="fa fa-user" style={{ padding: '5px' }} />
                            )}
                            <div className="datoUser">
                                <h3>{datos.userName}</h3>
                                <div>
                                    <p>{formatDate(datos.createdAtDate)}</p>
                                    <p>{formatTime(datos.createdAtTime)}</p>
                                </div>
                            </div>
                            <SlOptionsVertical className='ico-publiAction' />
                            <div className='accionPubli'>
                                <p onClick={() => abrirReporteClick(datos)}>Reportar</p>
                                <p onClick={() => abrirInfoClick(datos)}>Información</p>
                                {datos.userName === userName && (
                                    <p onClick={() => borrarPublicacion(datos._id)} style={{ color: 'red' }}>Eliminar</p>
                                )}
                            </div>
                        </header>

                        {datos.image || datos.video ? (
                            <div className="publicArchivo">
                                <p className='descrip'>{datos.textArchivo}</p>
                                {datos.image && (
                                    <div className="fotoPublicacion" onClick={() => handleImageClick(datos.image)}>
                                        <img src={`https://backend-systemblog-production.up.railway.app/uploads/${datos.image.filename}`} alt='' />
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

                        <footer>
                            <div className={`divGusta ${likes[datos._id] ? 'liked' : ''}`} onClick={() => handleLike(datos._id)}>
                                <FaHeart className={`ico meGusta ${likes[datos._id] ? 'liked' : ''}`} />
                                <p style={{ color: 'white' }}>{datos.likes}</p>
                            </div>
                            <div className={`divComentar ${showComments[datos._id] ? 'show-comments' : ''}`} onClick={() => handleComments(datos._id)}>
                                <TiMessages className='ico comentar' />
                                <p>{datos.comentarios.length}</p>
                            </div>
                        </footer>

                        {showComments[datos._id] && (
                            <Comentarios className={`comments ${showComments[datos._id] ? 'show-comments' : ''}`} comentarios={datos.comentarios} datos= {datos} />
                        )}

                        <div style={{ position: 'relative' }} className='formComent'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleCommentSubmit(datos._id);
                            }}>
                                <input
                                    type="text"
                                    placeholder="Comentar aquí ..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button type="submit">COMENTAR</button>
                            </form>
                        </div>
                    </div>
                ))}
            </main>
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <IoIosCloseCircleOutline className='close-button' onClick={closeModal} />
                    <img src={`https://backend-systemblog-production.up.railway.app/uploads/${selectedImage.filename}`} alt="Imagen ampliada" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
            {modalInfo && (
                <InfoPublicacion
                    publication={selectedPublication}
                    onClose={cerrarInfoModal}
                />
            )}
            {modalReport && (
                <Reporte
                    publication={selectedPublication}
                    onClose={cerrarReporteModal}
                />
            )}
        </div>
    );
};

export default Publicaciones;