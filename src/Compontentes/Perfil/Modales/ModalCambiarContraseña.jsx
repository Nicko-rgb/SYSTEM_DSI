import React, { useState } from 'react';
import './Modal.css';

const ModalCambiarContrasena = ({ onClose, onSave }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        onSave(oldPassword, newPassword);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Cambiar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Contraseña Actual:
                        <input name="oldPassword" type={showPassword ? "text" : "password"} placeholder="Contraseña actual" required />
                    </label>
                    <label>
                        Nueva Contraseña:
                        <input name="newPassword" type={showPassword ? "text" : "password"} placeholder="Nueva contraseña" required />
                    </label>
                    <label>
                        Confirmar Nueva Contraseña:
                        <input name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirmar nueva contraseña" required />
                    </label>
                    <label className="show-password">
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        Mostrar contraseñas
                    </label>
                    <button type="submit" className="modal-btn">Cambiar Contraseña</button>
                </form>
            </div>
        </div>
    );
};

export default ModalCambiarContrasena;
