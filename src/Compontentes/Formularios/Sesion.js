import { useState, useEffect } from "react";

const EstadoSesion = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setIdUser] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserName(localStorage.getItem('userName') || '');
            setIdUser(localStorage.getItem('userId') || '');
            setUserEmail(localStorage.getItem('userEmail') || '');
        }
    }, []);

    const handleLogin = (id, name, email, token) => {
        setIsLoggedIn(true);
        setUserName(name);
        setIdUser(id);
        setUserEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name);
        localStorage.setItem('userId', id);
        localStorage.setItem('userEmail', email)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        setIdUser('');
        setUserEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
    };

    return { userId, userName, userEmail, isLoggedIn, handleLogin, handleLogout };
};

export default EstadoSesion;