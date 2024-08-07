import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setIdUser] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [fotoPerfil, setFotoPerfil ] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserName(localStorage.getItem('userName') || '');
            setIdUser(localStorage.getItem('userId') || '');
            setUserEmail(localStorage.getItem('userEmail') || '');
            setFotoPerfil(localStorage.getItem('fotoPerfil') || '')
        }
    }, []);

    const handleLogin = (id, name, email, token, foto) => {
        setIsLoggedIn(true);
        setUserName(name);
        setIdUser(id);
        setUserEmail(email);
        setFotoPerfil(foto)
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', email)
        localStorage.setItem('fotoPerfil', foto)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        setIdUser('');
        setUserEmail('');
        setFotoPerfil('')
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('fotoPerfil')
    };

    //codigo para dirigir a sus propio perfil
    const minusculaName = userName.toLowerCase().replace(/\s+/g, '')
    const rutaPerfil = `/perfil/${minusculaName}/${userId}`

    return { userId, userName, userEmail, isLoggedIn, handleLogin, handleLogout, fotoPerfil, rutaPerfil};
};

export default EstadoSesion;