import './subirnuevo.css';
import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { IoMdCloudUpload } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";
import EstadoSesion from '../Formularios/Sesion';

const UploadForm = ({ cerrarSubir }) => {
    const { userName } = EstadoSesion();
    const [conArchivo, setConArchivo] = useState(false);
    const [text, setText] = useState('');
    const [textArchivo, setTextArchivo] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const subirArchivo = () => {
        setConArchivo(true);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const conTextoArchivo = (e) => {
        setTextArchivo(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxDuration = 30; // Duración máxima en segundos

        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setImage(selectedFile);
                setConArchivo(true);
            } else if (selectedFile.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(selectedFile);
                video.onloadedmetadata = () => {
                    if (video.duration <= maxDuration) {
                        setVideo(selectedFile);
                        setConArchivo(true);
                    } else {
                        alert(`El video debe tener una duración máxima de ${maxDuration} segundos.`);
                        cerrarSubir();
                    }
                };
            } else {
                alert('Solo se permiten archivos de imagen o video.');
                cerrarSubir();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            setMensaje('Rellene o Escriba en el Campo');
            return;
        }

        try {
            setMensaje('Subiendo Publicación....');

            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('text', text);
            formData.append('textArchivo', textArchivo);
            if (image) {
                formData.append('image', image);
            }
            if (video) {
                formData.append('video', video);
            }

            await axios.post('https://backend-systemblog-production.up.railway.app/api/publicaciones', formData);
            cerrarSubir();
            window.location.reload();
            console.log("Publicación exitosa");
        } catch (error) {
            setMensaje('Error al subir Publicación');
            console.error("Error al publicar:", error);
        }
    };

    return (
        <div className="formSubir">
            <div className="contenedor">
                <div className='subContend'>
                    <div className="subirCabeza">
                        <h2>Sube Algo Nuevo Aquí</h2>
                        <button className="close-btn" onClick={cerrarSubir}><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {!conArchivo ? (
                            <>
                                <textarea
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Sube algo nuevo o consulta tus dudas..."
                                />
                                <div>
                                    <TbPhotoPlus className='ico_subir_img' onClick={subirArchivo} />
                                    <p>Subir Archivo</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="descripcion">
                                    <textarea 
                                        value={textArchivo}
                                        placeholder='Añade una descripción o mensaje...'
                                        onChange={conTextoArchivo}
                                    />
                                </div>
                                {!image && !video && (
                                    <input type="file" className='archivo' onChange={handleFileChange} />
                                )}
                                <div className="verArchivo">
                                    {image && (
                                        <div className="file-preview">
                                            <img src={URL.createObjectURL(image)} alt="Archivo subido" />
                                        </div>
                                    )}
                                    {video && (
                                        <div className="file-preview">
                                            <video controls>
                                                <source src={URL.createObjectURL(video)} type={video.type} />
                                            </video>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        <p className='msgp'>{mensaje}</p>
                        <button type="submit"><IoMdCloudUpload className='icoSubir' /> Subir</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;