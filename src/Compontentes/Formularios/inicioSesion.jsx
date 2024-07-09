import './registro.css'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Cabeza from '../Navegador/Cabeza'
import EstadoSesion from './Sesion'

const Login = () => {
    const { handleLogin } = EstadoSesion()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/api/login', { email, password })
            console.log("Inicio de Sesion de usuario Exitoso");
            handleLogin(response.data.name, response.data.token)
            navigate('/')
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo.')
            }
        }
    }

    return (
        <div className="registroUser">
            <Cabeza />
            <div className="subRegistro sesion">
                <Link to='/'><MdArrowBackIos className='icoVolver'/></Link>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Correo electrónico</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errorMessage && <p className='errorPassword-message'>{errorMessage}</p>}
                    <button type="submit">INICIAR SESIÓN</button>
                    <p>No tienes cuenta?<Link to='/register' className='redirectLink'>Registrate</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login