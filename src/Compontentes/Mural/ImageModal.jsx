import React from 'react';

const ImageModal = ({ image, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <img src={image} alt="Imagen ampliada" />
            </div>
        </div>
    );
};

export default ImageModal;