import React, { useState, useEffect, useCallback } from 'react';
import './image.css';
import { GrNext } from "react-icons/gr";
import { MdArrowBackIosNew } from "react-icons/md";
import bb from '../../IMG/studentInformatica.jpeg';
import aa from '../../IMG/dev1.png';
import cc from '../../IMG/std1.jpg';
import dd from '../../IMG/std2.jpg';

const CardImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [aa, bb, cc, dd];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images]);

    const handlePrevImage = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    const handleNextImage = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    return (
        <div className="cardImage">
            <div className="image-container">
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex}`}
                    className={`image-${currentIndex}`}
                />
            </div>
            <button
                className="prev-btn"
                onClick={handlePrevImage}
                aria-label="Previous image"
            >
                <MdArrowBackIosNew className='ico' />
            </button>
            <button
                className="next-btn"
                onClick={handleNextImage}
                aria-label="Next image"
            >
                <GrNext className='ico'/>
            </button>
        </div>
    );
};

export default CardImage;
