import React, { useState, useEffect } from 'react';
import './developers.css';
import Navegador from '../../Navegador/Navegador';
import { CiHeart } from "react-icons/ci";
import Cabeza from '../../Navegador/Cabeza';
import NavegadorDsi from '../Nav/navDsi';
import ModalImg from '../../Modal/ModalImg';
import datDev from './data'; // Asegúrate de que este archivo contenga los datos de los desarrolladores
import axios from 'axios';
import EstadoSesion from '../../Formularios/Sesion';

const Developers = () => {
    const [verModal, setVerModal] = useState(false);
    const [imagenActual, setImagenActual] = useState(null);
    const [likes, setLikes] = useState({});
    const { userName } = EstadoSesion(); // Obtener el nombre de usuario

    useEffect(() => {
        // Cargar los "Me Gusta" iniciales desde el servidor
        const fetchLikes = async () => {
            try {
                const response = await axios.get('https://backend-systemblog-production.up.railway.app/api/likesdev');
                const likesData = response.data.reduce((acc, like) => {
                    acc[like.desarrolladorId] = like.likes;
                    return acc;
                }, {});
                setLikes(likesData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLikes();
    }, []);

    const abrirModal = (imagen) => {
        setImagenActual(imagen);
        setVerModal(true);
    };

    const cerrarModal = () => {
        setVerModal(false);
        setImagenActual(null);
    };

    const toggleLike = async (desarrolladorId) => {
        try {
            if(!userName){
                alert("Inicia sesión para poder dar like");
                return;
            }
            // Verificar si el usuario ya ha dado like
            const existingLikes = likes[desarrolladorId] || [];
            const userLike = existingLikes.find(like => like.userName === userName);

            let newLikes;

            if (userLike) {
                // Si el usuario ya dio like, restar el like
                newLikes = existingLikes.filter(like => like.userName !== userName);
            } else {
                // Si el usuario no ha dado like, agregar un nuevo like
                newLikes = [...existingLikes, { userName, value: 1 }];
            }

            // Actualizar los likes en el servidor
            const response = await axios.put(`https://backend-systemblog-production.up.railway.app/api/likesdev/${desarrolladorId}`, {
                userName,
                likes: newLikes,
            });

            // Actualizar el estado local
            setLikes({ ...likes, [desarrolladorId]: response.data.likes });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='developers'>
            <Cabeza />
            <Navegador />
            <main>
                <NavegadorDsi />
                <div className="container">
                    <h2 style={{ textAlign: 'center' }}>DESARROLLADORES D'SYSTEM BLOG</h2>
                    <div className="dev-list">
                        {datDev.map((dev, index) => (
                            <div className="box" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                                <img src={dev.img} alt={dev.nombre} onClick={() => abrirModal(dev.img)} />
                                <h3 className='name'>{dev.name}</h3>
                                <p>{dev.cargo}</p>
                                <p>{dev.email}</p>
                                <a href={dev.github} target="_blank" rel="noopener noreferrer">Cuenta de GitHub</a>
                                <CiHeart
                                    className={`icoGusta ${likes[dev.id] && likes[dev.id].some(like => like.userName === userName) ? 'liked' : ''}`}
                                    onClick={() => toggleLike(dev.id)}
                                />
                                <span className="like-count">{(likes[dev.id] ? likes[dev.id].length : 0)}</span> 
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {verModal && (
                <ModalImg
                    imagenActual={imagenActual}
                    cerrarModal={cerrarModal}
                />
            )}
        </div>
    );
};

export default Developers;
