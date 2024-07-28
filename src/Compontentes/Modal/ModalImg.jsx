import React from 'react';
import './modal.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ModalImg = ({ imagenActual, cerrarModal }) => {
    
    return (
        <div className="modal">
            <img src={imagenActual} alt="" />
            <IoIosCloseCircleOutline className='close-button' onClick={cerrarModal}/>
        </div>
    );
};

export default ModalImg;