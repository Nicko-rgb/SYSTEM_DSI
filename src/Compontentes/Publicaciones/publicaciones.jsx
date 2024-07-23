import './publicacion.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaHeart, FaRegShareSquare, FaPlus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl"
import texto from '../../IMG/texto.png'

import Navegador from '../Navegador/Navegador';
import Cabeza from '../Navegador/Cabeza';
import Comentarios from './Comentarios';
import UploadForm from './SubirNuevo';
import EstadoSesion from '../Formularios/Sesion';

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

    // const handleLike = (id) => {
    //     setLiked((prevLiked) => ({
    //         ...prevLiked,
    //         [id]: !prevLiked[id]
    //     }));
    // };

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

    //obtener las publicaciones
    useEffect(() => {
        const fechPublicacion = async () => {
            try {
                const dataPublicacion = await fetch("https://backend-systemblog-production.up.railway.app/api/publicaciones")
                const publicaciones = await dataPublicacion.json()
                setPublicaciones(publicaciones)

                // Inicializa los estados locales para cada publicación
                setShowComments(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
                setLikes(publicaciones.reduce((acc, pub) => ({ ...acc, [pub._id]: false }), {}));
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
            const response = await fetch(`/api/publicaciones/${publicacionId}`);
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

    //codigo de los likes de cada publicacion para obtener y enviar
    useEffect(() => {
        // Cargar los likes del usuario al iniciar el componente
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`https://backend-systemblog-production.up.railway.app/api/likes/${userName}`);
                setLikes(response.data.reduce((acc, like) => {
                    acc[like.publicacionId] = true;
                    return acc;
                }, {}));
            } catch (error) {
                console.error('Error al cargar los likes:', error);
            }
        };
        fetchLikes();
    }, [userName]);

    //obtener lo likes de cada uno
    const handleLike = async (publicacionId) => {
        try {
            // Verificar si el usuario ya ha dado like a la publicación
            if (likes[publicacionId]) {
                return;
            }

            // Enviar la acción de like al servidor
            await axios.post(`https://backend-systemblog-production.up.railway.app/api/publicaciones/${publicacionId}/like`, {
                userName: userName,
            });

            // Actualizar el estado local de likes
            setLikes((prevLikes) => ({ ...prevLikes, [publicacionId]: true }));

            // Actualizar el estado local de la publicación
            setPublicaciones((prevPublicaciones) =>
                prevPublicaciones.map((pub) =>
                    pub._id === publicacionId
                        ? { ...pub, likes: pub.likes + 1 }
                        : pub
                )
            );
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

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

                        {datos.image || datos.video ? (
                            <div className="publicArchivo">
                                <p className='descrip'> {datos.textArchivo} </p>
                                {datos.image && (
                                    <div className="fotoPublicacion" onClick={() => handleImageClick(datos.image)}>
                                        <img src={`/uploads/${datos.image.filename}`} alt='imagenPublic' />
                                    </div>
                                )}
                                {datos.video && (
                                    <div className="videoPublicacion">
                                        <video controls>
                                            <source src={`/uploads/${datos.video.filename}`} type={datos.video.contentType} />
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
                                <Comentarios className={`comments ${showComments[datos._id] ? 'show-comments' : ''}`} comentarios={datos.comentarios} />
                            )
                        }

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
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}><FaTimes /></button>
                        <img src={`/uploads/${selectedImage.filename}`} alt="Imagen ampliada" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Publicaciones;