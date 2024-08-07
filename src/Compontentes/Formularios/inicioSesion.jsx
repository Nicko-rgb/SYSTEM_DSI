import './registro.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'

import Cabeza from '../Navegador/Cabeza'
import EstadoSesion from './Sesion'

const Login = () => {
    const { handleLogin } = EstadoSesion()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axios.post('https://backend-systemblog-production.up.railway.app/api/login', { email, password })
            console.log("Inicio de Sesion de usuario Exitoso")
            handleLogin(
                response.data.id, 
                response.data.name, 
                response.data.email, 
                response.data.token, // Asegúrate de que el token se pase correctamente
                response.data.fotoPerfil.path // Pasar la foto de perfil
            )
            navigate('/')
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="registroUser">
            <Cabeza />
            <div className="subRegistro sesion">
                <Link to='/'><MdArrowBackIos className='icoVolver' /></Link>
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
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
                    </button>
                    <p>¿ No tienes cuenta ? <Link to="/register"> Registrate</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login;