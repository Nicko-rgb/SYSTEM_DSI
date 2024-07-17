import React from 'react';
import './developers.css';
import Navegador from '../../Navegador/Navegador';
import Cabeza from '../../Navegador/Cabeza';
import NavegadorDsi from '../Nav/navDsi';
import nick from '../../../IMG/nick.jpg';
import romer from '../../../IMG/ROMER.jpg';
import soria from '../../../IMG/SORIA.jpg';
import bruno from '../../../IMG/BRUNO.jpg';
import ModalImg from '../../Modal/Modal';

import { useState } from 'react';

const Developers = () => {
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
        <div className='developers'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>DESARROLLADORES D'SYSTEM BLOG</h1>
                    <div className='imgs'>
                        <div onClick={() => abrirModal(nick)}>
                            <h2>DIRECTOR</h2>
                            <img src={nick} alt="" />
                        </div>
                        <div onClick={() => abrirModal(romer)}>
                            <h2>DESARROLLADOR BINARIO</h2>
                            <img src={romer} alt="" />
                        </div>
                        <div onClick={() => abrirModal(soria)}>
                            <h2>ACTRIS DE PAGINA</h2>
                            <img src={soria} alt="" />
                        </div>
                        <div onClick={() => abrirModal(bruno)}>
                            <h2>DESARROLLADOR BINARIO</h2>
                            <img src={bruno} alt="" />
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
    );
};

export default Developers;