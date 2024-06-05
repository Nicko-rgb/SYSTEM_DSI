import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './mural.css'
const Mural = () => {
    return (
        <div className='periodico'>
            <div className="cajaPadre">

                <div className="Menu1">
                    <div className="title">
                        <h4>ACTIVIDADES</h4>
                    </div>
                    <div className='Menu-Caja'>
                       
                    </div>
                    <div className='Subir'> 
                        <FontAwesomeIcon icon={faUpload}/>
                        <h3>subir</h3>
                    </div>
                </div>
                <div className="Menu1">
                    <div className="title">
                        <h4>TECNOLOGIA</h4>
                    </div>
                    <div className='Menu-Caja'>

                    </div>
                    <div className='Subir'> 
                    <FontAwesomeIcon icon={faUpload}/>
                        <h3>subir</h3>
                    </div>
                </div>
                <div className="Menu1">
                    <div className="title">
                        <h4>CURIOSIDADES DE LA CARRERA</h4>
                    </div>
                    <div className='Menu-Caja'>

                    </div>
                    <div className='Subir'> 
                    <FontAwesomeIcon icon={faUpload}/>
                        <h3>subir</h3>
                    </div>
                 </div>
            </div>
        </div>

    )
}

export default Mural
