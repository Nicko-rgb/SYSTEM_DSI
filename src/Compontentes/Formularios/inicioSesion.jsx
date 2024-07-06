import './registro.css'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/api/login', { email, password })
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            setErrorMessage('Correo electrónico o contraseña incorrectos')
        }
    }

    return (
        <div className="registroUser">
            <div className="subRegistro">
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
