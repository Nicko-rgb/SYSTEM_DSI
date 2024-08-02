import React, { useState, useEffect, useRef } from 'react';
import './Perfil.css';
import EstadoSesion from '../Formularios/Sesion';
import { Link } from 'react-router-dom';
import ModalEditarPerfil from './Modales/ModalEditarPerfil';
import ModalCambiarContrasena from './Modales/ModalCambiarContraseña';

const Perfil = () => {
    const { userName, userId } = EstadoSesion();
    const [usuario, setUsuario] = useState(null);
    const [isEditarPerfilOpen, setIsEditarPerfilOpen] = useState(false);
    const [isCambiarContrasenaOpen, setIsCambiarContrasenaOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setUsuario({
            nombre: userName,
            email: `${userName}@gmail.com`,
            fotoPerfil: 'https://img.freepik.com/foto-gratis/colores-arremolinados-interactuan-danza-fluida-sobre-lienzo-que-muestra-tonos-vibrantes-patrones-dinamicos-que-capturan-caos-belleza-arte-abstracto_157027-2892.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=sph'
        });
    }, [userName]);

    if (!usuario) return <div>Cargando...</div>;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUsuario({ ...usuario, fotoPerfil: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditarPerfil = ({ nombre, email }) => {
        setUsuario({ ...usuario, nombre, email });
    };

    const handleCambiarContrasena = (oldPassword, newPassword) => {
        // Aquí implementarías la lógica para cambiar la contraseña
        console.log('Contraseña cambiada', { oldPassword, newPassword });
    };

    return (
        <div className="perfil-container">
            <Link className="boton-regresar" to="/">Regresar</Link>
            <div className="perfil-card">
                <img src={usuario.fotoPerfil} alt="Foto de perfil" className="perfil-foto" />
                <div className="perfil-info">
                    <h2>{userId} {usuario.nombre} </h2>
                    <p>{usuario.email}</p>
                </div>
                <div className="perfil-opciones">
                    <button className="opcion" onClick={() => fileInputRef.current.click()}>Cambiar foto</button>
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
        </div>
    );
};

export default Perfil;
