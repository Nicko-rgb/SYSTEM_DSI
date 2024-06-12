import './registro.css'

const RegistroUser = () => {

    return (
        <div className='registroUser'>
            <h1>Registro de usuario</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="tel" />
                </div>
                <div>
                    <label>¿Estudias en IESTP Suiza?</label>
                    <aside>
                        <p>SI</p>
                        <input type="checkbox" className='check' />
                    </aside>
                </div>
                <div>
                    <label>Carrera:</label>
                    <select>
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
                <div>
                    <label>Email:</label>
                    <input type="email" />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" />
                </div>
                <button type="submit">REGISTRAR</button>
            </form>
        </div>
    );
};

export default RegistroUser;