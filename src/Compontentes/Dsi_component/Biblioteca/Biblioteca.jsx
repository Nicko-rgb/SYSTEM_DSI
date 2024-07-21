import React from 'react';
import './biblioteca.css';
import Navegador from '../../Navegador/Navegador';
import NavegadorDsi from '../Nav/navDsi';
import Cabeza from '../../Navegador/Cabeza';
import Carpeta from './carpeta';


const Biblioteca = () => {

    return (
        <div className='biblioteca'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>Biblioteca de Developers</h1>
                    <p style={{ marginTop: '10px' }}>
                        Bienvenido a nuestra biblioteca de recursos para desarrolladores. Aquí encontrarás una amplia variedad de documentos,
                        tutoriales y guías creados por una comunidad de desarrolladores apasionados y dedicados.
                        Nuestra biblioteca está organizada por categorías para facilitar tu navegación. Cada documento ha sido cuidadosamente
                        seleccionado y revisado por nuestro equipo para asegurar su calidad y relevancia. Esperamos que estos recursos te ayuden
                        a expandir tus conocimientos, mejorar tus habilidades y alcanzar tus metas como desarrollador. Si tienes alguna
                        sugerencia o deseas contribuir con tus propios recursos, no dudes en contactarnos. ¡Juntos podemos construir una
                        comunidad de desarrolladores más fuerte y colaborativa!
                    </p>
                    <h3 style={{ marginTop: '20px', textDecoration: 'underline', color: 'orangered' }}>RECUSROS POR CATEGORIAS:</h3>
                    <div className="carpetas">
                        {Carpeta.map((carpeta, index) => (
                            <a href={carpeta.link} className="folder" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="subFolder">
                                    <p>{carpeta.nombre}</p>
                                    <img className='folderIco' src={carpeta.icon} alt="icoFolder" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Biblioteca;