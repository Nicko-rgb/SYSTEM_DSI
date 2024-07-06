import './registro.css';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un nuevo usuario
        const newUser = {
            name,
            lastName,
            phone,
            isStudent,
            email,
            password,
            createdAt: new Date()
        };

        try {
            await axios.post('/api/users', newUser);
            navigate('/login');
            console.log(newUser);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setErrorMessage('Error al registrar el usuario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className='registroUser'>
            <div className="subRegistro">
                <Link to='/'><MdArrowBackIos className='icoVolver' /></Link>
                <h2>Registro de usuario</h2>
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
                    {errorMessage && <p className='errorPassword-message'>{errorMessage}</p>}
                    <button type="submit">REGISTRAR</button>
                    <p>Ya tienes cuenta?<Link to='/login/' className='redirectLink'>Iniciar Sesion</Link></p>
                </form>
            </div>
        </div>
    );
};

export default RegistroUser;
