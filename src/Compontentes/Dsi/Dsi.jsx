import React from 'react'
import './dsi.css'

import { Link } from 'react-router-dom';
import { FaInfoCircle, FaChalkboardTeacher, FaServer } from "react-icons/fa";

import { PiBooksFill } from "react-icons/pi";
import { FaHandshakeSimple } from "react-icons/fa6";
const Dsi = () => {
    return (
        <div className='dsi'>
            <nav className="lateral">
                <div className='lateralIcons'>
                    <Link className='div' to="/dsi/">
                        <FaInfoCircle className='icons-lateral' />
                    </Link >
                    <Link className='div' to="/dsi/docentes">
                        <FaChalkboardTeacher className='icons-lateral' />
                    </Link >
                    <Link className='div' to="/dsi/modulos">
                        <FaServer className='icons-lateral' />
                    </Link >
                    <Link className='div' to="/dsi/biblioteca">
                        <PiBooksFill className='icons-lateral' />
                    </Link >
                    <Link className='div' to="/dsi/beneficios">
                        <FaHandshakeSimple className='icons-lateral' />
                    </Link >
                </div>
                <div className='lateral-hidde'>
                    <Link className='dsiLink' to="/dsi/">ACERCA DE</Link>
                    <Link className='dsiLink' to="/dsi/docentes">DOCENTES</Link>
                    <Link className='dsiLink' to="/dsi/modulos">MUDULOS</Link>
                    <Link className='dsiLink' to="/dsi/biblioteca">BIBLIOTECA</Link>
                    <Link className='dsiLink' to="/dsi/beneficios">BENEFICIOS</Link>
                </div>
            </nav>
            <div className="acerca-conatainer">
                <h1>ACERCA DE </h1>
            </div>
        </div>
    )
}

export default Dsi
