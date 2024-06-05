import React from 'react'
import './docentes.css'
import NavegadorDsi from '../Nav/navDsi'
import fotogil from '../../../IMG/docentegil.jpg'
import fotoruber from '../../../IMG/docenteruber.jpg'
import fotopuyo from '../../../IMG/docentepuyo.jpg'
import fotojhon from '../../../IMG/docentejhon.jpg'
import fotojuancarlos from '../../../IMG/docentejuancarlos.jpg'
import fotosecretaria from '../../../IMG/secretaria.jpg'
const Docentes = () => {
    return (
        <div className='docentes'>
            <NavegadorDsi />
            <div className="container">
            <div> 
                <div>
                   <h3>NOMBRE</h3>
                   <h5>GIL TORRES ARÉVALO</h5>
                    <img  alt='' src={fotogil}></img>
                   <h5> RUBER TORRES ARÉVALO</h5>
                   <img  alt='' src={fotoruber}></img>

                   <h5>CHRISTIAN DUSTIN PUYO TORRES</h5>
                   <img  alt='' src={fotopuyo}></img>

                   <h5> JOHN SABOYA FULCA</h5>
                   <img  alt='' src={fotojhon}></img>

                   <h5>JUAN CARLOS RIOS ARRIAGA</h5>
                   <img  alt='' src={fotojuancarlos}></img>

                   <h5>LISNAIRI TUANAMA SEBERIANO</h5>
                   <img  alt='' src={fotosecretaria}></img>
                </div>
                <div>
                  <h3>CORREO</h3>
                  <h5>giltorresarevalo@gmail.com</h5>
                  <h5>rutoar2015@gmail.com</h5>
                  <h5>christianpuyotorres@gmail.com</h5>
                  <h5>afheryita@gmail.com</h5>
                  <h5>virgojuank@hotmail.com</h5>
                  <h5>lisnairit@gmail.com</h5>
                 </div>
                 <div>
                   <h3>NUMERO DE CELULAR</h3>
                   <h5>976 681 426</h5>
                   <h5>982 574 167</h5>
                   <h5>918 282 361</h5>
                   <h5>988 452 364</h5>
                   <h5>942 652 485 </h5>
                   <h5>960 717 265</h5>
                 </div>
                   <div>
                    <h3>CARGO</h3>
                    <h5>COORDINADOR DEL P.E</h5>
                    <h5>DOCENTE</h5>
                    <h5>DOCENTE</h5>
                    <h5>DOCENTE</h5>
                    <h5>DOCENTE</h5>
                    <h5>SECRETARIA</h5>

                   </div>
              </div> 
               
            </div>
        </div>
    )
}

export default Docentes
