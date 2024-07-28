import React from 'react';
import './Modal.css';

const ModalEditarPerfil = ({ usuario, onClose, onSave }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const email = e.target.email.value;
        onSave({ nombre, email });
        onClose();
    };

    return (
        <div className="modalPerfil">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input name="nombre" defaultValue={usuario.nombre} placeholder="Nombre" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" defaultValue={usuario.email} placeholder="Email" type="email" required />
                    </div>
                    <button type="submit" className="btn">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarPerfil;
