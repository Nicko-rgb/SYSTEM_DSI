import React, { useState } from 'react';
import './mural.css';
import DataMural from './muralDB';
import Navegador from '../Navegador/Navegador';
import ModalImg from '../Modal/ModalImg';
import Cabeza from '../Navegador/Cabeza';

const Mural = () => {
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
        <div className="periodico">
            <Cabeza />
            <Navegador />
            <main>
                {DataMural.map((mural) => (
                    <section>
                        <h4>{mural.titulo} </h4>
                        <div className="content">
                            <aside>
                                {mural.data.map((data) => (
                                    <div>
                                        <img src={data.img} alt="" onClick={() => abrirModal(data.img)}/>
                                        <p>{data.descripcion} </p>
                                    </div>
                                ))}
                            </aside>
                        </div>
                    </section>
                ))}
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

export default Mural;