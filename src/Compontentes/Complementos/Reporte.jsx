import './reporte.css';
import React, { useState, useEffect } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";

export const Reporte = ({ publication, onClose }) => {
    const [reportReason, setReportReason] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [msg, setMsg] = useState('')

    useEffect(() => {
        // Cuando el modal se monta, se hace visible
        setIsVisible(true);
    }, []);

    const handleReportSubmit = async () => {
        setMsg('Enviando Reporte...')
        try {
            const response = await fetch(`https://backend-systemblog-production.up.railway.app/api/publicaciones/reportar/${publication._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reason: reportReason,
                    reportedUserName: publication.userName,
                }),
            });

            const data = await response.json();
            alert(data.message);
            handleClose(); // Llama a la función de cierre
        } catch (error) {
            console.error('Error al reportar la publicación:', error);
            setMsg('Error al Enviar Reporte!!')
        }
    };

    const handleClose = () => {
        setIsVisible(false); // Cambiar el estado a no visible
        setTimeout(onClose, 300); // Esperar a que termine la animación antes de llamar a onClose
    };

    return (
        <div className={`reporte ${isVisible ? 'scale-in' : 'scale-out'}`} onClick={handleClose}>
            <main onClick={(e) => e.stopPropagation()}>
                <RiCloseLargeLine onClick={handleClose} className='close_report' />
                <h2>Reportar Publicación</h2>
                <label htmlFor="report-reason">Escriba el motivo de reporte:</label>
                <textarea
                    id="report-reason"
                    rows="3"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Ingresa el motivo del reporte..."
                ></textarea>
                <p style={{textAlign: 'center'}}>{msg} </p>
                <button onClick={handleReportSubmit}>Enviar Reporte</button>
            </main>
        </div>
    );
};
