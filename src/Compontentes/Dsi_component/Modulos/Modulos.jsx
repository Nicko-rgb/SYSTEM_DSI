import React from 'react'
import './modulos.css'
import { useState } from 'react'
import Navegador from '../../Navegador/Navegador'
import Cabeza from '../../Navegador/Cabeza'
import ModalImg from '../../Modal/ModalImg'

import NavegadorDsi from '../Nav/navDsi'
import modulo1 from '../../../IMG/DSI-Mod1.png'
import modulo2 from '../../../IMG/DSI-Mod2.png'
import modulo3 from '../../../IMG/DSI-Mod3.png'

const Modulos = () => {

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
        <div className='modulos'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>MODULOS DE DESARROLLO DE SISTEMAS DE INFORMACION</h1>
                    <p>El area academica de Desarrollo de Sistemas de Información cuenta con 3 mudulos que se
                        desarrollara durante tiempo de estudios, un módula por año.
                    </p>
                    <div className='moduls'>
                        <div>
                            <h3>MODULO 1</h3>
                            <img alt='' src={modulo1} onClick={() => abrirModal(modulo1)}></img>
                        </div>
                        <div>
                            <h3>MODULO 2</h3>
                            <img alt='' src={modulo2}  onClick={() => abrirModal(modulo2)}></img>
                        </div>
                        <div>
                            <h3>MODULO 3</h3>
                            <img alt='' src={modulo3}  onClick={() => abrirModal(modulo3)}></img>
                        </div>
                        <div className='modulFinal'>

                        </div>
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

export default Modulos
