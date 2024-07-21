import React from 'react'
import './beneficios.css'
import Navegador from '../../Navegador/Navegador'
import NavegadorDsi from '../Nav/navDsi'
import Cabeza from '../../Navegador/Cabeza'

const Beneficios = () => {

    const beneficios = [
        {
            id: 1,
            titulo: 'Alta demanda laboral',
            descripcion: 'La industria de la tecnología está en constante crecimiento, y la necesidad de desarrolladores de sistemas es cada vez mayor. Esto se traduce en una amplia gama de oportunidades laborales y una alta tasa de empleabilidad.'
        },
        {
            id: 2,
            titulo: 'Salarios competitivos',
            descripcion: 'Los desarrolladores de sistemas suelen recibir salarios por encima del promedio en comparación con otras profesiones. Esto se debe a la escasez de talento y la alta demanda en el mercado.'
        },
        {
            id: 3,
            titulo: 'Flexibilidad laboral',
            descripcion: 'Muchos empleadores ofrecen opciones de trabajo remoto o híbrido, lo que permite a los desarrolladores elegir su entorno de trabajo y equilibrar mejor su vida personal y profesional.'
        },
        {
            id: 4,
            titulo: 'Oportunidades de aprendizaje',
            descripcion: 'La tecnología evoluciona rápidamente, lo que brinda a los desarrolladores la oportunidad de aprender nuevas herramientas y lenguajes de programación, manteniéndose actualizados y relevantes en su campo.',
        },
        {
            id: 5,
            titulo: 'Creatividad y resolución de problemas',
            descripcion: 'El desarrollo de software implica resolver problemas complejos y encontrar soluciones innovadoras, lo que puede ser muy gratificante y estimulante.'
        },
        {
            id: 6,
            titulo: 'Contribución a proyectos significativos',
            descripcion: 'Los desarrolladores tienen la oportunidad de trabajar en proyectos que pueden tener un impacto real en la vida de las personas, desde aplicaciones móviles hasta sistemas empresariales.'
        },
        {
            id: 7,
            titulo: 'Trabajo en equipo',
            descripcion: 'Trabajar como desarrollador a menudo implica colaborar con otros profesionales, como diseñadores, gerentes de producto y otros desarrolladores, lo que fomenta un ambiente de trabajo dinámico y enriquecedor.'
        },
        {
            id: 8,
            titulo: 'Diversidad de sectores',
            descripcion: 'Los desarrolladores pueden trabajar en una variedad de industrias, desde tecnología y salud hasta educación y finanzas, lo que les permite explorar diferentes áreas de interés.'
        },
        {
            id: 9,
            titulo: 'Posibilidad de freelancing',
            descripcion: 'Muchos desarrolladores optan por trabajar como freelancers, lo que les permite tener un mayor control sobre sus proyectos, horarios y tarifas.'
        },
        {
            id: 10,
            titulo: 'Acceso a recursos y herramientas',
            descripcion: 'Los desarrolladores tienen acceso a una amplia gama de herramientas, bibliotecas y recursos en línea que facilitan el aprendizaje y la creación de software de alta calidad.'
        },
        {
            id: 11,
            titulo: 'Oportunidades de viajes',
            descripcion: 'Muchos desarrolladores tienen la oportunidad de viajar a conferencias y eventos relacionados con su campo, lo que les permite conocer a otros profesionales y aprender sobre nuevas tecnologías y tendencias.'
        },
        {
            id: 12,
            titulo: 'Impacto en la sociedad',
            descripcion: 'El desarrollo de software puede tener un impacto positivo en la sociedad, desde mejorar la eficiencia de los servicios públicos hasta facilitar el acceso a la información y los servicios financieros.'
        }
    ];

    return (
        <div className='beneficios'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h1>BENEFICIOS DE SER DESARROLLADOR DE SISTEMAS</h1>
                    <div className="beneficios-lista">
                        {beneficios.map((beneficio, index) => (
                            <div key={beneficio.id} className="beneficio-item" style={{ animationDelay: `${index * 0.2}s` }}>
                                <h2>{beneficio.titulo}</h2>
                                <p>{beneficio.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Beneficios
