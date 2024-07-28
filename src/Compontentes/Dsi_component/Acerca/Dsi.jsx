import './dsi.css'
import React from 'react'
import { useState } from 'react';
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi';
import lenguajes from './lenguajes';
import Cabeza from '../../Navegador/Cabeza';
import ModalImg from '../../Modal/ModalImg';

import foto1 from '../../../IMG/codigo.png'
import foto2 from '../../../IMG/foto1.jpg'
import foto3 from '../../../IMG/std2.jpg'

import stdInfor from '../../../IMG/studentInformatica.jpeg'

const Dsi = () => {

    const [verModal, setVerModal] = useState(false);
    const [imagenActual, setImagenActual] = useState(null);

    const abrirModal = (imagen) => {
        setImagenActual(imagen);
        setVerModal(true);
    };

    const cerrarModal = () => {
        setVerModal(false);
        setImagenActual(null);
    };

    return (
        <div className='acerca'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi/>
                <section className="container">
                    <div className='subContent'>
                        <section className='div1'>
                            <p className='aa'>PROGRAMA DE ESTUDIOS</p>
                            <h1>DESARROLLO DE SISTEMAS DE INFORMACION IESTP - SUIZA</h1>
                            <div className='titulo'>
                                <h4>TITULO A NOMBRE DE LA NACION</h4>
                                <p>Profesional Técnico en Desarrollo de Sistemas de Información</p>
                            </div>
                            <div className='infoCarre'>
                                <div>
                                    <p>Carrera Profesional Técnica de 3 años de estudio</p>
                                </div>
                                <div>
                                    <p>6 CICLOS ACADÉMICOS</p>
                                </div>
                                <div>
                                    <p>3 Certificaciones Modulares</p>
                                </div>
                            </div>
                            <div className='descripcion'>
                                <h5>Descripción de la Carrera</h5>
                                <p>La carrera de Desarrollo de Sistemas de Información te prepara para diseñar, desarrollar y mantener sistemas informáticos que satisfagan las necesidades de las organizaciones. Aprenderás a programar en diversos lenguajes (Back-end & Front-end), gestionar bases de datos y administrar redes, aplicando metodologías ágiles y buenas prácticas de la industria.</p>
                            </div>
                            <div className="lenguajes">
                                <h5>Lenguajes de Programación y Herramientas</h5>
                                <div className="box-lenguajes">
                                    {lenguajes.map((dato, index) => (
                                        <div className='card' style={{ animationDelay: `${index * 0.3}s` }}>
                                            <img src={dato.img} alt="" />
                                            <h6>{dato.nombre}</h6>
                                            <p>{dato.descripcion} </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="descripcion2">
                                <div className='perfil'>
                                    <h5>Perfil del Egresado</h5>
                                    <ul>
                                        <li>Desarrolla aplicaciones web y móviles utilizando tecnologías actuales</li>
                                        <li>Diseña y administra bases de datos relacionales y no relacional</li>
                                        <li>Implementa soluciones de conectividad y seguridad en redes</li>
                                        <li>Trabaja en equipo y se adapta a los cambios tecnológicos</li>
                                        <li>Comunica efectivamente ideas y soluciones técnicas</li>
                                        <img src={stdInfor} alt="" />
                                    </ul>
                                </div>
                                <div className='salida'>
                                    <h5>Campo Laboral</h5>
                                    <p>Los egresados de la carrera pueden desempeñarse como programadores, analistas de sistemas, administradores de bases de datos, técnicos de redes y soporte informático en empresas de diversos sectores, tanto públicas como privadas.</p>
                                    <ul>
                                        <li>DESARROLLO DE SOFTWARE: Desarrolla software para empresas de servicios de mantenimiento de sistemas informáticos, empresas de venta y representación de soluciones informáticas, y empresas que producen software.</li>
                                        <li>ADMINISTRACION DE CENTROS DE COMPUTO: Administra centros de cómputo, redes de área local y extendida, y gestiona bases de datos relacional y no relacional.</li>
                                        <li>EMPRESAS DE TECNOLOGIA DE LA INFORMACION: Trabaja en empresas que proveen servicios de tecnologías de la información, incluyendo desarrollo de software, consultoría y asesoramiento.</li>
                                        <li>EMPRESAS DE SERVICIO  DE MENTENIMIENTO: Trabaja en empresas que ofrecen servicios de mantenimiento de sistemas informáticos, incluyendo soporte técnico y resolución de problemas.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className='div2'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4860.704793665854!2d-74.57432416324508!3d-8.39464977365317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a3bd76a21d1c31%3A0x699cb3518cd1af14!2sIESTP%20Suiza%20area%20total%20del%20terreno!5e0!3m2!1ses!2spe!4v1717520948901!5m2!1ses!2spe"
                                width="100%" height="250px" allowfullscreen="" title='MapaSuiza' loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                            <div className="galeria">
                                <img src={foto1} alt="" onClick={() => abrirModal(foto1)} />
                                <img src={foto2} alt="" onClick={() => abrirModal(foto2)}/>
                                <img src={foto3} alt="" onClick={() => abrirModal(foto3)}/>
                                <img src={stdInfor} alt=""onClick={() => abrirModal(stdInfor)} />
                                <img src={foto2} alt="" onClick={() => abrirModal(foto2)}/>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
            {verModal && (
                <ModalImg
                    imagenActual={imagenActual}
                    cerrarModal={cerrarModal}
                />
            )}
        </div>
    )
}


export default Dsi
