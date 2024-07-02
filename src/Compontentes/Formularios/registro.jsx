import './registro.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdArrowBackIos } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const RegistroUser = () => {
    const [estudiaEnIESTP, setEstudiaEnIESTP] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCheckboxChange = (event) => {
        setEstudiaEnIESTP(event.target.checked);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const formData = new FormData(event.target);
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Registro exitoso');
                // Redirigir al usuario a una página de inicio de sesión
                window.location.href = '/login';
            } else {
                const data = await response.json();
                console.error('Error al registrar el usuario:', data.message);
                // Mostrar mensaje de error al usuario
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            // Mostrar mensaje de error genérico al usuario
            alert('Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className='registroUser'>
            <div className="subRegistro">
                <Link to='/'><MdArrowBackIos className='icoVolver' /></Link>
                <h2>Registro de usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id='nombre' name='nombre' required />
                        <FaRegUser className='icon' />
                    </div>
                    <div>
                        <label htmlFor='apellido'>Apellido:</label>
                        <input type="text" id='apellido' name='apellido' required />
                        <FaRegUser className='icon' />
                    </div>
                    <div>
                        <label htmlFor='telefono'>Teléfono:</label>
                        <input type="text" id='telefono' name='telefono' required />
                        <FaPhone className='icon' />
                    </div>
                    <div>
                        <label>¿Estudias en IESTP Suiza?</label>
                        <aside>
                            <p>SI</p>
                            <input type="checkbox" className='check' name='estudiaEnIESTP' checked={estudiaEnIESTP} onChange={handleCheckboxChange} />
                        </aside>
                    </div>
                    {/* si "estudiaIESTP" es True se mostrará el div gracias a "&&" */}
                    {estudiaEnIESTP && (
                        <div>
                            <label>Carrera Profesional:</label>
                            <select name="carrera">
                                <option value="option1">Desarrollo de Sistemas de Informacion</option>
                                <option value="option2">Electrecidad industrial</option>
                                <option value="option2">Construcción Civil</option>
                                <option value="option2">Turismo y Hoteleria</option>
                                <option value="option2">Enfermeria Técnica</option>
                                <option value="option2">Administración de Empresas</option>
                                <option value="option2">Contabilidad</option>
                                <option value="option2">Secretariado Ejecutivo</option>
                                <option value="option2">Produccion Agropecuaria</option>
                                <option value="option2">Forestal</option>
                                <option value="option2">Mecánica Automotriz</option>
                            </select>
                        </div>
                    )}
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type="email" id='email' name='email' required />
                        <MdOutlineEmail className='icon' />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div>
                        <label>Confirmar Contraseña:</label>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    </div>
                    {password !== confirmPassword && (
                        <div className="error-message">Las contraseñas no coinciden.</div>
                    )}
                    <button type="submit" disabled={password !== confirmPassword}>REGISTRAR</button>
                    <p>Ya tienes cuenta?<Link to='/login/' className='redirectLink'>Iniciar Sesion</Link></p>
                </form>
            </div>
        </div>
    );
};

export default RegistroUser;