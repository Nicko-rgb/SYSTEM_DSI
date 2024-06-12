import React from 'react'
import './developers.css'
import NavegadorDsi from '../Nav/navDsi'
import miqui from '../../../IMG/miqui.png'
import soria from '../../../IMG/soria.jpg'
import xiomi from '../../../IMG/xiomi.jpg'

const Developers = () => {
    return (
        <div className='developers'>
            <NavegadorDsi />
            <div className="container">
                <h1>DESARROLLADORES D'SYSTEM BLOG</h1>
                <div className='imgs'>
                    <div>
                        <h2>DIRECTOR SEO</h2>
                        <img src={miqui} alt="" />
                    </div>
                    <div>
                        <h2>DESARROLLADOR BINARIO</h2>
                        <img src={soria} alt="" />
                    </div>
                    <div>
                        <h2>ACTRIS DE PAGINA</h2>
                        <img src={xiomi} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Developers
