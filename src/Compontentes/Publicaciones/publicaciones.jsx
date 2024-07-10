import React, { useState } from 'react';
import './publicacion.css';
import { FaHeart, FaRegShareSquare, FaPlus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import imagen1 from '../../IMG/std2.jpg';
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

    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleComments = () => {
        setShowComments(!showComments);
    };

    const mostrarSubirPublic = () => {
        setShowUploadForm(true);
    };

    const cerrarSubirPublic = () => {
        setShowUploadForm(false);
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
                        <input type="text" placeholder='Escribe Aquí'  />
                        <FaPlus className='iconPlus'/>
                    </div>
                </div>
                )}
                {showUploadForm && (
                    <UploadForm cerrarSubir={cerrarSubirPublic} />
                )}

                <div className="content-publicacion">
                    <header>
                        <i className="fa fa-user"></i>
                        <div className="datoUser">
                            <h3>Joseph Padilla Alvan</h3>
                            <div>
                                <p>12/05/2024</p>
                                <p>8:45 am</p>
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
                    <p className='descrip'>Los cachimbos en su primer día</p>
                    <div className="fotoPublicacion">
                        <img src={imagen1} alt="" id="myImg" />
                    </div>
                    <footer>
                        <div className={`divGusta ${liked ? 'liked' : ''}`} onClick={handleLike}>
                            <FaHeart className={`ico meGusta ${liked ? 'liked' : ''}`} />
                            <p style={{ color: 'white' }}>120 k</p>
                        </div>
                        <div className='divCompartir'>
                            <FaRegShareSquare className='ico compartir' />
                            <p>Compartir</p>
                        </div>
                        <div className={`divComentar ${showComments ? 'show-comments' : ''}`} onClick={handleComments}>
                            <TiMessages className='ico comentar' />
                            <p>Comentarios</p>
                        </div>
                    </footer>

                    {
                        showComments && (
                            <Comentarios className={`comments ${showComments ? 'show-comments' : ''}`} />
                        )
                    }

                    <div style={{ position: 'relative' }}>
                        <input type="text" placeholder="Comentar aquí ..." />
                        <TiMessages className='ico-comment' />
                    </div>
                </div>

                <div className="content-publicacion">
                    <header>
                        <i className="fa fa-user"></i>
                        <div className="datoUser">
                            <h3>Cesar Soria Paima</h3>
                            <div>
                                <p>12/05/2024</p>
                                <p>8:45 am</p>
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
                    <p className='descrip'>Esto es otro nivel</p>
                    <div className="fotoPublicacion">
                        <img src={meme} alt="" id="myImg" />
                    </div>
                    <footer>
                        <div className={`divGusta ${liked ? 'liked' : ''}`} onClick={handleLike}>
                            <FaHeart className={`ico meGusta ${liked ? 'liked' : ''}`} />
                            <p style={{ color: 'white' }}>120 k</p>
                        </div>
                        <div className='divCompartir'>
                            <FaRegShareSquare className='ico compartir' />
                            <p>Compartir</p>
                        </div>
                        <div className={`divComentar ${showComments ? 'show-comments' : ''}`} onClick={handleComments}>
                            <TiMessages className='ico comentar' />
                            <p>Comentarios</p>
                        </div>
                    </footer>

                    {
                        showComments && (
                            <Comentarios className={`comments ${showComments ? 'show-comments' : ''}`} />
                        )
                    }

                    <div style={{ position: 'relative' }}>
                        <input type="text" placeholder="Comentar aquí ..." />
                        <TiMessages className='ico-comment' />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Publicaciones;