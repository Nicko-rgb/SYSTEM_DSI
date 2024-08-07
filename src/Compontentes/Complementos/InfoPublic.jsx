import React, { useEffect, useState } from 'react';
import './infopublic.css';
import { RiCloseLargeLine } from "react-icons/ri";

export const InfoPublicacion = ({ publication, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Cuando el modal se monta, se hace visible
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false); // Cambia el estado a no visible
        setTimeout(onClose, 300); // Espera a que termine la animación antes de llamar a onClose
    };

    if (!publication) return null; // Si no hay publicación, no renderizar nada

    return (
        <div className={`informacion ${isVisible ? 'scale-in' : 'scale-out'}`} onClick={handleClose}>
            <main onClick={(e) => e.stopPropagation()}>
                <RiCloseLargeLine className='close_info' onClick={handleClose} />
                <h2>Información de la Publicación</h2>
                <p><strong>Usuario:</strong> {publication.userName}</p>
                <p><strong>Fecha de Publicación:</strong> {new Date(publication.createdAt).toLocaleString()}</p>
                {publication.image || publication.video ? (
                    <>
                        {publication.textArchivo && (<p><strong>Título de Contenido: </strong> {publication.textArchivo} </p>)}
                        {publication.image && (
                            <img src={`https://backend-systemblog-production.up.railway.app/uploads/${publication.image.filename}`} alt="Imagen de la publicación" />
                        )}
                        {publication.video && (
                            <video controls>
                                <source src={`https://backend-systemblog-production.up.railway.app/uploads/${publication.video.filename}`} type={publication.video.contentType} />
                            </video>
                        )}

                    </>
                ) : (
                    <div className='txt_boxx'>
                        <p>{publication.text}</p>
                    </div>
                )}
                <p><strong>N° Likes: </strong> {publication.likes} </p>
                <p><strong>N° Comentarios: </strong>{publication.comentarios.length} </p>
            </main>
        </div>
    );
};