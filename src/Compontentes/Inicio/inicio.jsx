import React, { useState, useEffect } from 'react';
import './Inicio.css';
import imagen1 from '../../IMG/Suiza.jpg';
import imagen3 from '../../IMG/std1.jpg'
import imagen4 from '../../IMG/std2.jpg'
import imagen5 from '../../IMG/std3.jpg'

import { FaUserFriends } from "react-icons/fa";

const Inicio = () => {
    const [imagenActual, setImagenActual] = useState(0);
    const imagenes = [imagen1, imagen3, imagen4, imagen5];

    useEffect(() => {
        const intervalo = setInterval(() => {
            setImagenActual((prevImagenActual) => (prevImagenActual + 1) % imagenes.length);
        }, 2500);

        return () => clearInterval(intervalo);
    }, [imagenes]);

    return (
        <div className='inicio'>
            <h3 className='Inst'>INSTITUTO DE EDUCACION SUPERIOR TECNOLOGICO PUBLICO SUIZA</h3>
            <div className='subInicio'>
                <h1>DESARROLLO DE SISTEMAS DE INFORMACION - SUIZA</h1>
                <h3 className='frase'>Cada línea de código que escribes es un paso hacia la transformación digital. Abraza el poder de la innovación y deja que tu pasión por el desarrollo de sistemas te guíe hacia el éxito.</h3>
            </div>
            <div className='fotosTransis'>
                <img
                    src={imagenes[imagenActual]}
                    alt={`Imagen ${imagenActual + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className="buton">
                <button><FaUserFriends className='uneteIcon icons'/>UNETE A NOSOTROS</button>
            </div>
            
        </div>
    );
};

export default Inicio;