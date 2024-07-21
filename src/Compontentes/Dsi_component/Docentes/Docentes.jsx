import React from 'react'
import './docentes.css'
import NavegadorDsi from '../Nav/navDsi'
import Profes from './data'
import Navegador from '../../Navegador/Navegador'
import Cabeza from '../../Navegador/Cabeza'
import ModalImg from '../../Modal/ModalImg'
import { useState } from 'react'

const Docentes = () => {

    const [verModal, setVerModal] = useState(false);
    const [imagenActual, setImagenActual] = useState(null);

    const abrirModal = (imagen) => {
        setImagenActual(imagen);
        setVerModal(true);
    };

    const cerrarModal = () => {
        setVerModal(false);
        setImagenActual(null);
    };

    return (
        <div className='docentes'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>MAESTROS 2024 DEL AREA DE ESTUDIOS DE DESARROLLO DE DISTEMAS DE INFORMACION</h1>
                    <div className="box-profes">
                        {Profes.map((dato, index) => (
                            <div className='box' style={{ animationDelay: `${index * 0.2}s` }}>
                                <h5>{dato.nombre} </h5>
                                <img src={dato.foto} alt="" onClick={() => abrirModal(dato.foto)}/>
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
            {verModal && (
                <ModalImg
                    imagenActual={imagenActual}
                    cerrarModal={cerrarModal}
                />
            )}
        </div>
    )
}

export default Docentes
