import './coment.css'
import React from 'react';
import { FaUser } from "react-icons/fa";

const Comentarios = ({ comentarios }) => {
    return (
        <section className='comentarios'>
            {comentarios.map((comentario, index) => (
                <div key={index} className='sub'>
                    <div className="infoComent">
                        <FaUser className='userComent' />
                        <h4>{comentario.usuario}</h4>
                    </div>
                    <p className='txtCom' style={{ color: 'white', fontSize: '15px' }}>{comentario.texto}</p>
                </div>
            ))}
        </section>
    );
};

export default Comentarios;