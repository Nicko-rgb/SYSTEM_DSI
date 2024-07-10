import React from 'react';
import './biblioteca.css';
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi';

const Biblioteca = () => {
    return (
        <div className='biblioteca'>
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>Biblioteca de romer</h1>
                </div>
            </main>
        </div>
    );
};

export default Biblioteca;