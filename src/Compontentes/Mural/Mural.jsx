import React, { useState } from 'react';
import './mural.css';
import Navegador from '../Navegador/Navegador';
import ImageModal from './ImageModal';

import activi1 from './IMG/activi1.jpeg';
import activi2 from './IMG/activi2.jpeg';
import activi3 from './IMG/activi3.jpeg';

import img1 from './IMG/imgHacker.jpeg';
import img2 from './IMG/tecno.jpg';
import img3 from './IMG/texno.jpg';

import tip1 from './IMG/tip1.jpeg';
import tip2 from './IMG/tip2.jpeg';
import tip3 from './IMG/tip3.jpeg';

const Mural = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    return (
        <div className="periodico">
            <Navegador />
            <main>
                <header>
                    <div>
                        <h4>ACTIVIDADES DEL AREA</h4>
                    </div>
                    <div>
                        <h4>TECNOLOGIA E INFORMATICA</h4>
                    </div>
                    <div>
                        <h4>CURIOSIDADES</h4>
                    </div>
                </header>
                <section>
                    <aside className="actividades">
                        <img src={activi1} alt="activi1" onClick={() => handleImageClick(activi1)} />
                        <p>El area academica organiza concurso de programacion</p>
                        <img src={activi2} alt="activi2" onClick={() => handleImageClick(activi2)} />
                        <p>Se programa la semana tecnica con las siguientes actividades</p>
                        <img src={activi3} alt="activi3" onClick={() => handleImageClick(activi3)} />
                        <p>Gran partido por semana tecnica</p>
                    </aside>
                    <aside className="tecnologia">
                        <img src={img1} alt="tecnologia1" onClick={() => handleImageClick(img1)} />
                        <img src={img2} alt="tecnologia2" onClick={() => handleImageClick(img2)} />
                        <img src={img3} alt="tecnologia3" onClick={() => handleImageClick(img3)} />
                    </aside>
                    <aside className="curiosidades">
                        <img src={tip1} alt="curiosidad1" onClick={() => handleImageClick(tip1)} />
                        <img src={tip2} alt="curiosidad2" onClick={() => handleImageClick(tip2)} />
                        <img src={tip3} alt="curiosidad3" onClick={() => handleImageClick(tip3)} />
                    </aside>
                </section>
            </main>
            {selectedImage && (
                <ImageModal image={selectedImage} onClose={handleModalClose} />
            )}
        </div>
    );
};

export default Mural;