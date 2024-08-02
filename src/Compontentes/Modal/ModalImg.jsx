import React from 'react';
import './modal.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ModalImg = ({ imagenActual, cerrarModal }) => {
    
    return (
        <div className="modal" onClick={cerrarModal}>
            <img src={imagenActual} alt="" onClick={(e) => e.stopPropagation()}/>
            <IoIosCloseCircleOutline className='close-button' onClick={cerrarModal}/>
        </div>
    );
};

export default ModalImg;