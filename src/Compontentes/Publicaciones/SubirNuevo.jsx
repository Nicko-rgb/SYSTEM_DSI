import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './subirnuevo.css'

const UploadForm = ({ onClose }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el contenido al servidor
        console.log('Texto:', text);
        console.log('Archivo:', file);
        onClose();
    };

    return (
        <div className="formSubir">
            <div className="contenedor">
                <div className="subirCabeza">
                    <h2>Sube Algo Nuevo Aquí</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Escribe tu titulo aquí..."
                    ></textarea>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Subir</button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;