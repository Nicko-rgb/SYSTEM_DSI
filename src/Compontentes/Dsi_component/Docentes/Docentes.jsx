import React from 'react'
import './docentes.css'
import NavegadorDsi from '../Nav/navDsi'

const Docentes = () => {
    return (
        <div className='docentes'>
            <NavegadorDsi />
            <div className="container">
            <div> 
                <div>
                   <h3>NOMBRE</h3>
                   <h5>GIL TORRES ARÉVALO</h5>
                   <h5> RUBER TORRES ARÉVALO</h5>
                   <h5>CHRISTIAN DUSTIN PUYO TORRES</h5>
                   <h5> JOHN SABOYA FULCA</h5>
                   <h5>JUAN CARLOS RIOS ARRIAGA</h5>
                   <h5>LISNAIRI TUANAMA SEBERIANO</h5>
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
                 </div>
               <h3>CARGO</h3>
               </div> 
               
            </div>
        </div>
    )
}

export default Docentes
