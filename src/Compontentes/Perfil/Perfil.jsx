import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Perfil.css';
import EstadoSesion from '../Formularios/Sesion';
import { Link } from 'react-router-dom';
import ModalEditarPerfil from './Modales/ModalEditarPerfil';
import ModalCambiarContrasena from './Modales/ModalCambiarContraseña';
import axios from 'axios';
import Compressor from 'compressorjs';

const Perfil = () => {
    const { userId } = EstadoSesion(); // Asegúrate de que userId esté disponible
    const [usuario, setUsuario] = useState(null);
    const [isEditarPerfilOpen, setIsEditarPerfilOpen] = useState(false);
    const [isCambiarContrasenaOpen, setIsCambiarContrasenaOpen] = useState(false);
    const [msg, setMsg] = useState('Cambiar Foto de Perfil');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://backend-systemblog-production.up.railway.app/api/users/${userId}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setMsg('Actualizando Foto...');
        if (file) {
            // Comprimir la imagen
            new Compressor(file, {
                quality: 0.6, // Ajusta la calidad según sea necesario (0.0 a 1.0)
                success: async (compressedResult) => {
                    const formData = new FormData();
                    formData.append('fotoPerfil', compressedResult);

                    try {
                        const response = await axios.post(`https://backend-systemblog-production.up.railway.app/api/update-profile-picture/${userId}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });

                        // Actualizar el estado con la nueva foto de perfil
                        setUsuario({ ...usuario, fotoPerfil: response.data.user.fotoPerfil.path });
                    } catch (error) {
                        console.error('Error al subir la foto de perfil:', error);
                        setMsg('Error al actualizar!!');
                    } finally {
                        setMsg('Cambiar Foto de Perfil');
                    }
                },
                error(err) {
                    console.error(err.message);
                },
            });
        }
    };

    const openModal = (imagePath) => {
        setSelectedImage(imagePath);
        setIsModalOpen(true);
    };

    const handleEditarPerfil = ({ nombre, email }) => {
        setUsuario({ ...usuario, nombre, email });
    };

    const handleCambiarContrasena = (oldPassword, newPassword) => {
        console.log('Contraseña cambiada', { oldPassword, newPassword });
    };

    if (!usuario) return <div>Cargando...</div>;
    const cerrarModalFoto = () => {
        setIsModalOpen(false);
    }
    return (
        <div className="perfil-container">
            <Link className="boton-regresar" to="/">Regresar</Link>
            <div className="perfil-card">
                <div className="box_foto" onClick={() => openModal(usuario.fotoPerfil.path)}>
                    {usuario.fotoPerfil && usuario.fotoPerfil.path ? (
                        <img src={usuario.fotoPerfil.path} alt="Foto de perfil" />
                    ) : (
                        <FaUserCircle className="icon_user" size={100} />
                    )}
                </div>
                <div className="perfil-info">
                    <h2>{usuario.name} {usuario.lastName}</h2>
                    <p>{usuario.email}</p>
                </div>
                <div className="perfil-opciones">
                    <button className="opcion" onClick={() => fileInputRef.current.click()}> {msg} </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <button className="opcion" onClick={() => setIsEditarPerfilOpen(true)}>Editar perfil</button>
                    <button className="opcion" onClick={() => setIsCambiarContrasenaOpen(true)}>Cambiar contraseña</button>
                </div>
            </div>

            {isEditarPerfilOpen && (
                <ModalEditarPerfil
                    usuario={usuario}
                    onClose={() => setIsEditarPerfilOpen(false)}
                    onSave={handleEditarPerfil}
                />
            )}

            {isCambiarContrasenaOpen && (
                <ModalCambiarContrasena
                    onClose={() => setIsCambiarContrasenaOpen(false)}
                    onSave={handleCambiarContrasena}
                />
            )}

            {isModalOpen && (
                <div className="modal-foto" onClick={cerrarModalFoto}>
                    <span className="close-foto" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <img onClick={(e) => e.stopPropagation()} src={selectedImage} alt="Imagen Ampliada" />
                </div>
            )}
        </div>
    );
};

export default Perfil;