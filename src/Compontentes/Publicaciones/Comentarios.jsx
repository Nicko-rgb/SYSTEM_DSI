import './coment.css'
import React from 'react';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';

const Comentarios = ({ comentarios, datos }) => {
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
                        {!imgError && datos.userId && datos.userId.fotoPerfil && datos.userId.fotoPerfil.path ? (
                            <img
                                src={`https://backend-systemblog-production.up.railway.app/${datos.userId.fotoPerfil.path}`}
                                alt="Foto de perfil"
                                onError={handleImageError}
                                className="user_foto" // Asegúrate de aplicar estilos para que se vea bien
                            />
                        ) : (
                            <FaUser className="user_ico" style={{ padding: '5px' }} />
                        )}
                        <h4>{comentario.usuario}</h4>
                    </div>
                    <p className='txtCom' style={{ color: 'white', fontSize: '15px' }}>{comentario.texto}</p>
                </div>
            ))}
        </section>
    );
};

export default Comentarios;