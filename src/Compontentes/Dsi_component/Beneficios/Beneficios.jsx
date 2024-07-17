import React from 'react'
import './beneficios.css'
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi'
import Cabeza from '../../Navegador/Cabeza'

const Beneficios = () => {
    return (
        <div className='beneficios'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>BENEFICIOS</h1>
                </div>
            </main>
        </div>
    )
}

export default Beneficios
