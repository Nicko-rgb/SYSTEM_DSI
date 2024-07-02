import React, { useState } from 'react';
import './publicacion.css';
import { FaHeart, FaRegShareSquare } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { SlOptionsVertical } from "react-icons/sl";
import imagen1 from '../../IMG/std2.jpg';

import Navegador from '../Navegador/Navegador';
import Comentarios from './Comentarios';
import SubirPublicacion from './Subir';

const Publicaciones = () => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <div class="publicaciones">
           <Navegador /> 
            <main class="subPubli">

                <SubirPublicacion className='subirPublicacion'/>

                <div class="content-publicacion">
                    <header>
                        <i class="fa fa-user"></i>
                        <div class="datoUser">
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
                    <div class="fotoPublicacion">
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

            </main>
        </div>
    )
};

export default Publicaciones;