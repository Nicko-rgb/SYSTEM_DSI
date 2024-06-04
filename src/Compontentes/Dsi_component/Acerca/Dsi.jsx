import React from 'react'
import './dsi.css'
import 'animate.css';

import NavegadorDsi from '../Nav/navDsi';

import foto1 from '../../../IMG/foto1.jpg'
import foto2 from '../../../IMG/foto2.jpg'
import foto3 from '../../../IMG/foto3.jpg'

const Dsi = () => {
    return (
        <div className='acerca'>
            <NavegadorDsi className='dsiNav' />
            <main className="container">
                <h1>DESARROLLO DE SISTEMAS DE INFORMACION IESTP - SUIZA</h1>
                <div className='subContent'>
                    <div className='div1'>
                        
                        <div className="cards">
                            <img src={foto1} alt="" className="card" />
                            <img src={foto2} alt="" className="card card2" />
                            <img src={foto3} alt="" className="card" />

                        </div>
                    </div>
                    <div className='div2'>
                        <h4>TITULO A NOMBRE DE LA NACION:</h4>
                        <p>Pofecional Técnico en Desarrollo de Sistemas de Informacion</p>
                        <section>
                            <div>
                                <p>Carrera Profecional Técnica de 3 años de esudio</p>
                            </div>
                            <div>
                                <p>6 CICLOS ACADEMICOS</p>
                            </div>
                            <div>
                                <p>3 Certificaciones Modulares</p>
                            </div>
                        </section>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4860.704793665854!2d-74.57432416324508!3d-8.39464977365317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a3bd76a21d1c31%3A0x699cb3518cd1af14!2sIESTP%20Suiza%20area%20total%20del%20terreno!5e0!3m2!1ses!2spe!4v1717520948901!5m2!1ses!2spe"
                            width="100%" height="400px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dsi
