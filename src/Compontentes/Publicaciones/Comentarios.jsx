import './coment.css';
import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";

const Comentarios = ({ comentarios }) => {
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true); // Cambia el estado si hay un error al cargar la imagen
    };

    return (
        <section className='comentarios'>
            {comentarios.map((comentario, index) => (
                <div key={index} className='sub'>
                    <div className="infoComent">
                        {/* Mostrar la foto de perfil o el icono de usuario */}
                        {!imgError && comentario.usuarioId && comentario.usuarioId.fotoPerfil && comentario.usuarioId.fotoPerfil.path ? (
                            <img
                                src={`https://backend-systemblog-production.up.railway.app/${comentario.usuarioId.fotoPerfil.path}`}
                                alt="Foto de perfil"
                                onError={handleImageError}
                                className="user_foto" // Asegúrate de aplicar estilos para que se vea bien
                            />
                        ) : (
                            <FaUser className="user_ico" style={{ padding: '5px' }} />
                        )}
                        <h4>{comentario.usuarioId.name} {comentario.usuarioId.lastName}</h4> {/* Asegúrate de que el nombre esté disponible */}
                    </div>
                    <p className='txtCom' style={{ color: 'white', fontSize: '15px' }}>{comentario.texto}</p>
                </div>
            ))}
        </section>
    );
};

export default Comentarios;
