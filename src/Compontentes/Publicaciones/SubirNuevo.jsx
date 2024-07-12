import './subirnuevo.css'
import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { IoMdCloudUpload } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";
import EstadoSesion from '../Formularios/Sesion';

const UploadForm = ({ cerrarSubir }) => {
    const { userName } = EstadoSesion();
    const [conArchivo, setConArchivo] = useState(false)
    const [text, setText] = useState(``);
    const [textArchivo, setTextArchivo] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const subirArchivo = () => {
        setConArchivo(true)
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    };
    const conTextoArchivo = (e) => {
        setTextArchivo(e.target.value);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxDuration = 30; // Duración máxima en segundos

        if (selectedFile.type.startsWith('image/')) {
            setImage(selectedFile);
            setConArchivo(true); // Establecer conArchivo en true después de seleccionar el archivo
        } else if (selectedFile.type.startsWith('video/')) {
            // Validar la duración del video
            const video = document.createElement('video');
            video.src = URL.createObjectURL(selectedFile);
            video.onloadedmetadata = () => {
                if (video.duration <= maxDuration) {
                    setVideo(selectedFile);
                    setConArchivo(true); // Establecer conArchivo en true después de seleccionar el archivo
                } else {
                    alert(`El video debe tener una duración máxima de ${maxDuration} segundos.`);
                    cerrarSubir()
                }
            };
        } else {
            alert('Solo se permiten archivos de imagen o video.');
            cerrarSubir();
        }
    };

    //codigo para enviar datos de publicacion
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('text', `${text}`);
            formData.append('textArchivo', textArchivo);
            if (image) {
                formData.append('image', image);
            }
            if (video) {
                formData.append('video', video);
            }

            await axios.post('/api/publicaciones', formData);
            cerrarSubir();
            //recargar ventana
            window.location.reload();
            console.log("Publicación exitosa");
        } catch (error) {
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
                        {!conArchivo && (
                            <>
                                <textarea
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Sube algo nuevo o consulta tus dudas..."
                                ></textarea>
                                <div>
                                    <TbPhotoPlus className='ico_subir_img' onClick={subirArchivo} />
                                    <p>Subir Archivo</p>
                                </div>
                            </>
                        )}
                        {conArchivo && (
                            <>
                                <div className="descripcion">
                                    <textarea 
                                        value={textArchivo}
                                        placeholder='Añade una descripcion o mensaje...'
                                        onChange={conTextoArchivo}
                                    ></textarea>
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
                        <button type="submit"><IoMdCloudUpload className='icoSubir' /> Subir</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;