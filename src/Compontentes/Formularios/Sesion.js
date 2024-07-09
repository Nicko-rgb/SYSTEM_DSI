import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserName(localStorage.getItem('userName'));
        }
    }, []);

    const handleLogin = (name, token) => {
        setIsLoggedIn(true);
        setUserName(name);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    };

    return { userName, isLoggedIn, handleLogin, handleLogout };
};

export default EstadoSesion;