import './coment.css'
import React from 'react';

const Comentarios = ({ comentarios }) => {
    return (
        <section>
            {comentarios.map((comentario, index) => (
                <div key={index} className='sub'>
                    <div className="infoComent">
                        <i></i>
                        <h4>{comentario.usuario}</h4>
                    </div>
                    <p style={{ color: 'white' }}>{comentario.texto}</p>
                </div>
            ))}
        </section>
    );
};

export default Comentarios;