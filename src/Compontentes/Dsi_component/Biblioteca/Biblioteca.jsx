import React from 'react';
import './biblioteca.css';
import NavegadorDsi from '../Nav/navDsi';

const Biblioteca = () => {
    return (
        <div className='biblioteca'>
            <NavegadorDsi /> 
            <div className="container">
                <h1>Biblioteca de romer</h1>
            </div>
        </div>
    );
};

export default Biblioteca;