import React from 'react';
import './horario.css';
import NavegadorDsi from '../Nav/navDsi';
import Cabeza from '../../Navegador/Cabeza';
import Navegador from '../../Navegador/Navegador';

export const Horario = () => {
    const horas = [
        "14:15 - 15:00",
        "15:00 - 15:45",
        "15:45 - 16:30",
        "16:30 - 17:15",
        "17:15 - 18:00",
        "18:00 - 18:20",
        "18:20 - 19:05",
        "19:05 - 19:50"
    ];

    // Definir los días de la semana
    const dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    //horarios de 1 ciclo
    const lunes1 = [
        "Arquitectura de computacion e integracion de TIC",
        "Arquitectura de computacion e integracion de TIC",
        "Arquitectura de computacion e integracion de TIC",
        "Fundamentos de programacion",
        "Fundamentos de programacion",
        "Receso",
        "Aplicaciones Empresariales",
        "Aplicaciones Empresariales",
    ]
    const martes1 = [
        "",
        "Experiencias formativas",
        "Experiencias formativas",
        "Lenguaje de programacion",
        "Lenguaje de programacion",
        "Receso",
        "Redes y conectividad de computadoras",
        "Redes y conectividad de computadoras",
    ]
    const miercoles1 = [
        "Lenguaje de programacion",
        "Lenguaje de programacion",
        "Lenguaje de programacion",
        "Arquitectura de computadora e integracion de TIC",
        "Arquitectura de computadora e integracion de TIC",
        "Receso",
        "Aplicaciones empresariales",
    ]
    const jueves1 = [
        "",
        "Fundamentos de programacion",
        "Fundamentos de programacion",
        "Fundamentos de programacion",
        "Comunicacion oral",
        "Receso",
        "Comunicacion oral",
        "Comunicacion oral",
    ]
    const viernes1 = [
        "Ofimatica",
        "Ofimatica",
        "Ofimatica",
        "Redes y conectividad de computadoras",
        "Redes y conectividad de computadoras",
        "Receso",
        "Redes y conectividad de computadoras",
        "Tutoria",
    ]

    //horarios de 3 ciclo
    const lunes3 = [
        "Inglés para la comunicación oral",
        "Inglés para la comunicación oral",
        "Inglés para la comunicación oral",
        "Programación distribuida",
        "Programación distribuida",
        "Receso",
        "Programación concurrente",
        "Programación concurrente",

    ];

    const martes3 = [

        "",
        "Programación distribuida",
        "Programación distribuida",
        "Programación concurrente",
        "Programación concurrente",
        "Receso",
        "Programación orientada  objetos",
        "Programación orientada  objetos",

    ];

    const miercoles3 = [
        "Investigación tecnológica",
        "Investigación tecnológica",
        "Investigación tecnológica",
        "Experiencias formativas",
        "Experiencias formativas",
        "Receso",
        "Programación orientada objetos",
        "Programación orientada objetos",

    ];

    const jueves3 = [
        "Programación concurrente",
        "Programación concurrente",
        "Programación distribuida",
        "Programación distribuida",
        "Modelamiento de software",
        "Receso",
        "Modelamiento de software",
        "Modelamiento de software",

    ];

    const viernes3 = [
        "Programación orientada a objetos",
        "Programación orientada a objetos",
        "Estructura de bases de datos",
        "Estructura de bases de datos",
        "Estructura de bases de datos",
        "Receso",
        "Tutoría",
        "Tutoría",
    ];

    //Horario de 5 ciclo

    const lunes5 = [
        "Diseño de aplicaciones moviles",
        "Diseño de aplicaciones moviles",
        "Diseño de aplicaciones moviles",
        "Diseño web",
        "Diseño web",
        "Receso",
        "Diseño web",
        "Tutoria",
    ]
    const martes5 = [
      "Comportamiento etico",
      "Comportamiento etico",
      "Comportamiento etico",
      "Experiencias formativas",
      "Experiencias formativas",
      "Receso",
      "Animacion grafica",
      "Animacion grafica",
    ]
    const miercoles5 = [
        "",
        "Diseño web",
        "Diseño web",
        "Diseño de aplicaciones moviles",
        "Diseño de aplicaciones moviles",
        "Receso",
        "Gestion y administracion web",
        "Gestion y administracion web",
    ]
    const jueves5 = [
      "Animacion Grafica",
      "Animacion Grafica",
      "Comportamiento etico",
      "Comportamiento etico",
      "Gestion y administracion web",
      "Receso",
      "Gestion y administracion web",
      "Gestion y administracion web",
    ]
    const viernes5 = [
        "Diseño de aplicaciones moviles",
        "Diseño de aplicaciones moviles",
        "Diseño web",
        "Diseño web",
        "Animacion grafica",
        "Receso",
        "Animacion grafica",
        "Tutoria"
    ]

    // Arreglo de días para facilitar el acceso
    const datasAsignatura1 = [lunes1,martes1,miercoles1,jueves1,viernes1]
    const diasAsignaturas3 = [lunes3, martes3, miercoles3, jueves3, viernes3];
    const diasAsignaturas5 = [lunes5,martes5,miercoles5,jueves5,viernes5]

    

    return (
        <div className="horario">
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <p className='titulo'>Horarios de Desarrollo de Sistemas</p>
                    <nav className='hor_ciclos'>
                        <a href="#1ciclo" className='ciclo1'>I CICLO</a>
                        <a href="#3ciclo" className='ciclo2'>III CICLO</a>
                        <a href="#5ciclo" className='ciclo3'>V CICLO</a>
                    </nav>

                    <div className="tablas_horario">
                        <div className="tabla" id='1ciclo'>
                            <h3>Horario de I Ciclo</h3>
                            <table>
                                <thead>
                                    <tr>
                                        {dias.map((dia, index) => (
                                            <th key={index}>{dia}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horas.map((hora, index) => (
                                        <tr key={index}>
                                            <td>{hora}</td>
                                            {/* Rellenar las celdas con las asignaturas correspondientes */}
                                            {datasAsignatura1.map((asignaturas, diaIndex) => (
                                                <td key={diaIndex}>{asignaturas[index]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="tabla" id='3ciclo'>
                            <h3>Horario de III Ciclo</h3>
                            <table>
                                <thead>
                                    <tr>
                                        {dias.map((dia, index) => (
                                            <th key={index}>{dia}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horas.map((hora, index) => (
                                        <tr key={index}>
                                            <td>{hora}</td>
                                            {/* Rellenar las celdas con las asignaturas correspondientes */}
                                            {diasAsignaturas3.map((asignaturas, diaIndex) => (
                                                <td key={diaIndex}>{asignaturas[index]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="tabla  ultima" id='5ciclo'>
                            <h3>Horario de V Ciclo</h3>
                            <table>
                                <thead>
                                    <tr>
                                        {dias.map((dia, index) => (
                                            <th key={index}>{dia}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horas.map((hora, index) => (
                                        <tr key={index}>
                                            <td>{hora}</td>
                                            {/* Rellenar las celdas con las asignaturas correspondientes */}
                                            {diasAsignaturas5.map((asignaturas, diaIndex) => (
                                                <td key={diaIndex}>{asignaturas[index]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Horario;
