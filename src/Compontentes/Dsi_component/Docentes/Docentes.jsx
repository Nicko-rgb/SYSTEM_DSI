import React from 'react'
import './docentes.css'
import navegador from '../../Navegador/Navegador'
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
                    <h3>MAESTROS 2024 DEL AREA DE ESTUDIOS DE DESARROLLO DE DISTEMAS DE INFORMACION</h3>
                    <div className="box-profes">
                        {Profes.map(dato => (
                            <div className='box'>
                                <h5>{dato.nombre} </h5>
                                <img src={dato.foto} alt="" />
                                <p>{dato.email} </p>
                                <p>{dato.numero} </p>
                                <h6>{dato.cargo} </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Docentes
