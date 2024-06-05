import React from 'react'
import './modulos.css'
import NavegadorDsi from '../Nav/navDsi'
import modulo1 from '../../../IMG/DSI-Mod1.png'
import modulo2 from '../../../IMG/DSI-Mod2.png'
import modulo3 from '../../../IMG/DSI-Mod3.png'

const Modulos = () => {
    return (
        <div className='modulos'>
            <NavegadorDsi />
            <div className="container">
                <h1>MODULOS</h1>
                <h1>MODULO 1</h1>
                <div><img  alt='' src={modulo1}></img></div>
                <h1>MODULO 2</h1>
                <div> <img  alt='' src={modulo2}></img></div>
                <h1>MODULO 3</h1>
                <div> <img  alt='' src={modulo3}></img></div>
                
            </div>
        </div>
    )
}

export default Modulos
