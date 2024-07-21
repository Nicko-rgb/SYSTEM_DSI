import React, { useState, useEffect, useRef } from 'react';
import './Perfil.css';
import EstadoSesion from '../Formularios/Sesion';
import { Link } from 'react-router-dom';

const Perfil = () => {
    const { userName } = EstadoSesion();
    const [usuario, setUsuario] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setUsuario({
            nombre: userName,
            email: `${userName}@gmai.com`,
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

    const handleEditarPerfil = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const email = e.target.email.value;
        setUsuario({ ...usuario, nombre, email });
    };

    const handleCambiarContrasena = (e) => {
        e.preventDefault();
        // Aquí implementarías la lógica para cambiar la contraseña
        console.log('Contraseña cambiada');
    };

    return (
        <div className="perfil-container">
            <Link className="boton-regresar" to="/">Regresar</Link>
            <div className="perfil-card">
                <img src={usuario.fotoPerfil} alt="Foto de perfil" className="perfil-foto" />
                <div className="perfil-info">
                    <h2>{usuario.nombre}</h2>
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
                    <button className="opcion">Editar perfil</button>
                    <button className="opcion">Cambiar contraseña</button>
                </div>
            </div>
            <form onSubmit={handleEditarPerfil}>
                <input name="nombre" defaultValue={usuario.nombre} placeholder="Nombre" required />
                <input name="email" defaultValue={usuario.email} placeholder="Email" type="email" required />
                <button type="submit">Guardar</button>
            </form>

            <form onSubmit={handleCambiarContrasena}>
                <input name="oldPassword" type="password" placeholder="Contraseña actual" required />
                <input name="newPassword" type="password" placeholder="Nueva contraseña" required />
                <input name="confirmPassword" type="password" placeholder="Confirmar nueva contraseña" required />
                <button type="submit">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default Perfil;