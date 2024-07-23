import './registro.css';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cabeza from '../Navegador/Cabeza';

const RegistroUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Verificar si el correo electrónico ya existe en la base de datos
            const existingUser = await axios.get(`https://backend-systemblog-production.up.railway.app/api/users?email=${email}`);
    
            if (existingUser.data.email === email) {
                setErrorMessage('Correo electrónico ya está en uso');
                return;
            }
    
            // Verificar si las contraseñas coinciden
            if (password !== confirmPassword) {
                setErrorMessage('Contraseña no coincide');
                return;
            }
    
            // Crear un nuevo usuario
            const newUser = {
                name,
                lastName,
                phone,
                isStudent,
                email,
                password,
                fecha_registro: new Date()
            };
    
            await axios.post('https://backend-systemblog-production.up.railway.app/api/users', newUser);
            navigate('/login');
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setErrorMessage('Error al registrar el usuariooo');
        }
    };

    return (
        <div className='registroUser'>
            <Cabeza />
            <div className="subRegistro regis">
                <Link to='/'><MdArrowBackIos className='icoVolver' /></Link>
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                        <FaRegUser className='icon' />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <FaRegUser className='icon' />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <FaPhone className='icon' />
                    </div>
                    <div>
                        <label>¿Eres estudiante de DSI del IESTP Suiza?</label>
                        <aside>
                            <p>SI</p>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                        </aside>
                    </div>
                    <div>
                        <label>Correo electrónico:</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdOutlineEmail className='icon' />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Confirmar Contraseña:</label>
                        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="terminos">
                        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <label>Al Registrarse Acepta los <Link to='/wiki/system-blog/term & condic' className='link'>Términos y Condiciones</Link></label>
                    </div>
                    {errorMessage && <p className='errorPassword-message'>{errorMessage}</p>}
                    <button type="submit" className={`${termsAccepted ? '' : 'disabled'}`}>REGISTRAR</button>
                    <p>Ya tienes cuenta?<Link to='/login/' className='link'>Iniciar Sesion</Link></p>
                </form>
            </div>
        </div>
    );
};

export default RegistroUser;