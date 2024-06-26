import React from 'react'
import './docentes.css'
import NavegadorDsi from '../Nav/navDsi'
import Profes from './data'

const Docentes = () => {
    return (
        <div className='docentes'>
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
        </div>
    )
}

export default Docentes
