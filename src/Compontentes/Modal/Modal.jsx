import React from 'react';
import './modal.css';

const ModalImg = ({ imagenActual, cerrarModal }) => {
    
    return (
        <div className="modal">
            <img src={imagenActual} alt="" />
            <button className="close-button" onClick={cerrarModal}>Cerrar</button>
        </div>
    );
};

export default ModalImg;