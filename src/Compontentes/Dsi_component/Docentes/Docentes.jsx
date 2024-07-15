import React from 'react'
import './docentes.css'
import NavegadorDsi from '../Nav/navDsi'
import Profes from './data'
import Navegador from '../../Navegador/Navegador'

const Docentes = () => {
    return (
        <div className='docentes'>
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h2>MAESTROS 2024 DEL AREA DE ESTUDIOS DE DESARROLLO DE DISTEMAS DE INFORMACION</h2>
                    <div className="box-profes">
                        {Profes.map(dato => (
                            <div className='box'>
                                <h5>{dato.nombre} </h5>
                                <img src={dato.foto} alt="" />
                                <div>
                                    <p>{dato.email} </p>
                                    <p>{dato.numero} </p>
                                    <h4>{dato.cargo} </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Docentes
