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
                                <p className='txtPr'>{dato.nombre} </p>
                                <img src={dato.foto} alt="" onClick={() => abrirModal(dato.foto)}/>
                                <div>
                                    <p className='txtPr'>{dato.email} </p>
                                    <p className='txtPr'>{dato.numero} </p>
                                    <p className='txtPr'>{dato.cargo} </p>
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
