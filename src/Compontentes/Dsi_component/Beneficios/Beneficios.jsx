import React from 'react'
import './beneficios.css'
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi'

const Beneficios = () => {
    return (
        <div className='beneficios'>
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
