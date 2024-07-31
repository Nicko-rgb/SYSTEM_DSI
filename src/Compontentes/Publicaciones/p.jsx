import './subirnuevo.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { IoMdCloudUpload } from "react-icons/io";
import { TbPhotoPlus, TbPhotoUp } from "react-icons/tb";
import EstadoSesion from '../Formularios/Sesion';

const UploadForm = ({ cerrarSubir }) => {
    const { userName } = EstadoSesion();
    const [conArchivo, setConArchivo] = useState(false);
    const [text, setText] = useState('');
    const [textArchivo, setTextArchivo] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    const fileInputRef = useRef(null);

    const handleFileIconClick = () => {
        fileInputRef.current.click();
    };

    const handleGalleryToggle = () => {
        setShowGallery(!showGallery);
        loadGalleryImages();
    };

    const loadGalleryImages = async () => {
        try {
            const response = await navigator.mediaDevices.getUserMedia({ video: false, audio: false });
            const track = response.getTracks()[0];
            const imageCapture = new ImageCapture(track);
            const imageBitmaps = await imageCapture.getAvailableImageModes();
            const images = await Promise.all(imageBitmaps.map(async (bitmap) => {
                const blob = await imageCapture.grabFrame(bitmap);
                return URL.createObjectURL(blob);
            }));
            setGalleryImages(images);
        } catch (error) {
            console.error('Error al cargar las imágenes de la galería:', error);
        }
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

    const selectImageFromGallery = (selectedImage) => {
        setImage(selectedImage);
        setConArchivo(true);
        setShowGallery(false); // Cerrar la galería
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
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Sube algo nuevo o consulta tus dudas..."
                                />
                                <div>
                                    <TbPhotoPlus className='ico_subir_img' onClick={() => setConArchivo(true)} />
                                    <p className='txt_subir'>Subir Archivo</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="descripcion">
                                    <textarea
                                        value={textArchivo}
                                        placeholder='Añade una descripción o mensaje...'
                                        onChange={(e) => setTextArchivo(e.target.value)}
                                    />
                                </div>
                                {!image && !video && (
                                    <div className='seleccionar'>
                                        <TbPhotoUp className="selec_file" onClick={handleGalleryToggle} />
                                        <p className='txt_selec'>Seleccione de la Galería</p>
                                        <input type="file" ref={fileInputRef} className="archivo" onChange={handleFileChange} style={{ display: 'none' }} />
                                        <button type="button" onClick={handleFileIconClick}>Abrir Explorador de Archivos</button>
                                    </div>
                                )}
                                <div className="verArchivo">
                                    {image && (
                                        <div className="file-preview">
                                            <img src={image} alt="Archivo subido" />
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

                    {/* Componente de Galería */}
                    {showGallery && (
                        <div className="gallery">
                            <h3>Galería de Imágenes</h3>
                            <div className="gallery-grid">
                                {galleryImages.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Imagen ${index + 1}`}
                                        onClick={() => selectImageFromGallery(imageUrl)}
                                    />
                                ))}
                            </div>
                            <button onClick={handleGalleryToggle}>Cerrar Galería</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadForm;