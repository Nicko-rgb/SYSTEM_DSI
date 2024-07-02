import React from 'react'
import './mural.css'
import Navegador from '../Navegador/Navegador'


const Mural = () => {
    return (
        <div className='periodico'>
            <Navegador />
            <main>
                <div className="headers-mural">
                    <div className='title-mural'>
                        <p>ACTICIDADES</p>
                    </div>
                    <div className='title-mural'>
                        <p>TECNOLOGIA</p>
                    </div>
                    <div className='title-mural'>
                        <p>CURIOSIDADES DE LA CARRERA</p>
                    </div>
                </div>
                <div className="content-mural">
                    <div className="contenido"></div>
                    <div className="contenido"></div>
                    <div className="contenido"></div>
                </div>
            </main>
        </div>
    )
}

export default Mural
