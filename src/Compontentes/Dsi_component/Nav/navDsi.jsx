import React from 'react'
import './navDsi.css'
import { Link } from 'react-router-dom'

import { FaInfoCircle, FaChalkboardTeacher, FaServer, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { FaHandshakeSimple, FaPeopleLine } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";

const NavegadorDsi = () => {
    return (
        <div className='dsiNav'>
            <nav className="lateral">
                <div className='lateralIcons'>
                    <Link className='div link1' to="/dsi/">
                        <FaInfoCircle className='icons-lateral' />
                    </Link >
                    <Link className='div link2' to="/dsi/docentes">
                        <FaChalkboardTeacher className='icons-lateral' />
                    </Link >
                    <Link className='div link3' to="/dsi/modulos">
                        <FaServer className='icons-lateral' />
                    </Link >
                    <Link className='div link4' to="/dsi/biblioteca">
                        <PiBooksFill className='icons-lateral' />
                    </Link >
                    <Link className='div link5' to="/dsi/beneficios">
                        <FaHandshakeSimple className='icons-lateral' />
                    </Link >
                    <Link className='div link6' to="/dsi/developers">
                        <FaPeopleLine className='icons-lateral' />
                    </Link >
                </div>
                
                <div className='lateral-hidde'>
                    <Link className='dsiLink link1' to="/dsi/">Acerca de</Link>
                    <Link className='dsiLink link2' to="/dsi/docentes">Docentes</Link>
                    <Link className='dsiLink link3' to="/dsi/modulos">Módulos</Link>
                    <Link className='dsiLink link4' to="/dsi/biblioteca">Biblioteca</Link>
                    <Link className='dsiLink link5' to="/dsi/beneficios">Beneficios</Link>
                    <Link className='dsiLink link6' to="/dsi/developers">Desarrolladores</Link>

                    <div className="iconsRedes">
                        <Link className='lIco' to='https://www.facebook.com/nick.mancillaleon' title='Facebook'>
                            <FaFacebook className='ico fb' />
                        </Link>
                        <Link className='lIco' to='https://walink.co/7c3eb6' title='WhatsApp'>
                            <FaWhatsapp className='ico wsp' />
                        </Link>
                        {/* <Link className='lIco' to='https://institutosuiza.edu.pe/' title='Conoce más'>
                            <img src={internet} alt="" />
                        </Link> */}
                        <Link className='lIco' to='https://maps.app.goo.gl/CYYX3S4YEFjuyHCi7' title='Mapa'>
                            <CiLocationOn className='ico map'/>
                        </Link>
                        <Link className='lIco' to='mailto:mancillanixon7@gmail.com' title='Correo Electronicodcf'>
                            <MdOutlineMail className='ico mail' />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavegadorDsi