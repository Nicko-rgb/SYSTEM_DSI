import React, { useState } from 'react';
import './mural.css';
import Navegador from '../Navegador/Navegador';
import ModalImg from '../Modal/ModalImg';

import activi1 from './IMG/activi1.jpeg';
import activi2 from './IMG/activi2.jpeg';
import activi3 from './IMG/activi3.jpeg';

import img1 from './IMG/imgHacker.jpeg';
import img2 from './IMG/tecno.jpg';
import img3 from './IMG/texno.jpg';

import tip1 from './IMG/tip1.jpeg';
import tip2 from './IMG/tip2.jpeg';
import tip3 from './IMG/tip3.jpeg';

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
            <Navegador />
            <main>
                <header>
                    <div>
                        <h4>ACTIVIDADES DEL AREA</h4>
                    </div>
                    <div>
                        <h4>TECNOLOGIA E INFORMATICA</h4>
                    </div>
                    <div>
                        <h4>CURIOSIDADES</h4>
                    </div>
                </header>
                <section>
                    <aside className="actividades">
                        <img src={activi1} alt="activi1" onClick={() => abrirModal(activi1)} />
                        <p>El area academica organiza concurso de programacion</p>
                        <img src={activi2} alt="activi2" onClick={() => abrirModal(activi2)} />
                        <p>Se programa la semana tecnica con las siguientes actividades</p>
                        <img src={activi3} alt="activi3" onClick={() => abrirModal(activi3)} />
                        <p>Gran partido por semana tecnica</p>
                    </aside>
                    <aside className="tecnologia">
                        <img src={img1} alt="tecnologia1" onClick={() => abrirModal(img1)} />
                        <img src={img2} alt="tecnologia2" onClick={() => abrirModal(img2)} />
                        <img src={img3} alt="tecnologia3" onClick={() => abrirModal(img3)} />
                    </aside>
                    <aside className="curiosidades">
                        <img src={tip1} alt="curiosidad1" onClick={() => abrirModal(tip1)} />
                        <img src={tip2} alt="curiosidad2" onClick={() => abrirModal(tip2)} />
                        <img src={tip3} alt="curiosidad3" onClick={() => abrirModal(tip3)} />
                    </aside>
                </section>
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