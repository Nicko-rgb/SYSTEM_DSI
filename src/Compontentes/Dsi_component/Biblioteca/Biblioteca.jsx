import React from 'react';
import './biblioteca.css';
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi';
import Cabeza from '../../Navegador/Cabeza';

const Biblioteca = () => {
    return (
        <div className='biblioteca'>
            <Cabeza />
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