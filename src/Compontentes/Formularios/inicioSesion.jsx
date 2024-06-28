import './registro.css'
import { Link } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'


const Login = () => {
    return (
        <div className="registroUser">
            <div className="subRegistro">
                <Link to='/'><MdArrowBackIos className='icoVolver'/></Link>
                <h2>Iniciar Sesion</h2>
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"  required />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" required/>
                    </div>
                    <button type="submit">INICIAR SESION</button>
                    <p>No tienes cuenta?<Link to='/register' className='redirectLink'>Registrate</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Login