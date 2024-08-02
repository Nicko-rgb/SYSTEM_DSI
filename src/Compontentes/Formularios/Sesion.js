import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setIdUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserName(localStorage.getItem('userName') || '');
            setIdUser(localStorage.getItem('userId') || '');
        }
    }, []);

    const handleLogin = (id, name, token) => {
        setIsLoggedIn(true);
        setUserName(name);
        setIdUser(id);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userId', id);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        setIdUser('');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
    };

    return { userId, userName, isLoggedIn, handleLogin, handleLogout };
};

export default EstadoSesion;