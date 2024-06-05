import React from 'react'
import './dsi.css'
import 'animate.css';

import NavegadorDsi from '../Nav/navDsi';

import foto1 from '../../../IMG/codigo.png'
import foto2 from '../../../IMG/foto1.jpg'
import foto3 from '../../../IMG/std2.jpg'
import chica from '../../../IMG/chica.jpg'


const Dsi = () => {
    return (
        <div className='acerca'>
            <NavegadorDsi className='dsiNav' />
            <main className="container">
                <h1>DESARROLLO DE SISTEMAS DE INFORMACION IESTP - SUIZA</h1>
                <div className='subContent'>
                    <div className='div1'>
                        <h3 className='tcompe'>COMPETENCIAS ESPECIFICAS</h3>
                        <div className='competencias'>
                            <ol>
                                <li>Desarrollar la construcción de programas de los sistemas de información, de acuerdo con el diseño funcional, estándares internacionales de TI, buenas prácticas de programación y políticas de seguridad de la organización.</li>
                                <li>Desarrollar las pruebas integrales de los sistemas de información y servicios de TI en la fase de implantación, de acuerdo con el diseño funcional, buenas prácticas de TI y políticas de seguridad de la organización.</li>
                                <li>Realizar la puesta en producción de los sistemas de información o servicios de TI, de acuerdo con la planificación efectuada.</li>
                                <li>Administrar el diseño funcional de los sistemas de información, de acuerdo con las demandas del negocio que son parte del alcance de la arquitectura de sistemas vigente.</li>
                            </ol>
                            <img src={chica} alt="" />
                        </div>
                        <div className="cards">
                            <img src={foto1} alt="" className="card" />
                            <img src={foto2} alt="" className="card " />
                            <img src={foto3} alt="" className="card card3" />
                        </div>
                    </div>
                    <div className='div2'>
                        <h4>TITULO A NOMBRE DE LA NACION</h4>
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
                            width="100%" height="400px" allowfullscreen="" title='MapaSuiza' loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dsi
