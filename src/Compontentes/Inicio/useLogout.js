import { useNavigate } from 'react-router-dom';

const useLogout = (handleLogout) => {
    const navigate = useNavigate();

    const handleLogoutAndReload = () => {
        handleLogout();
        navigate(0); // Recargar la página
    };

    return handleLogoutAndReload;
};

export default useLogout;