import React, { useState, useEffect } from 'react';
import './CursorEfect.css';

const CursorEffect = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [trailPositions, setTrailPositions] = useState([]);
    const [trailLength] = useState(10);
    const [trailDuration] = useState(500);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setCursorPosition({ x: event.clientX, y: event.clientY });
            setTrailPositions((prevPositions) => {
                const newPositions = [...prevPositions, { x: event.clientX, y: event.clientY }];
                return newPositions.slice(-trailLength);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [trailLength]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrailPositions((prevPositions) => prevPositions.slice(1));
        }, trailDuration / trailLength);

        return () => clearInterval(interval);
    }, [trailLength, trailDuration]);

    return (
        <div className="cursor-effect">
            <div
                className="cursor"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                }}
            />
            {trailPositions.map((position, index) => (
                <div
                    key={index}
                    className="trail"
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                />
            ))}
        </div>
    );
};

export default CursorEffect;