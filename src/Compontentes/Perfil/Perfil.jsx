
import React from 'react'
import EstadoSesion from '../Formularios/Sesion'

export const Perfil = () => {

    const { userName } = EstadoSesion()

    return (
        <div className="perfil">
            <h1>Perfil de {userName}</h1>
        </div>
    )
}

export default Perfil