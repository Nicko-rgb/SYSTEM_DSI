import React, { useState } from 'react';

const SubirPublicacion = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleTituloChange = (e) => {
        setTitulo(e.target.value);
    }

    const handleContenidoChange = (e) => {
        setContenido(e.target.value);
    }

    const handleImagenChange = (e) => {
        setImagen(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('contenido', contenido);
        formData.append('imagen', imagen);

        try {
            const response = await fetch('/api/publicaciones', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Publicación subida con éxito');
            } else {
                console.error('Error al subir publicación');
            }
        } catch (error) {
            console.error('Error al subir publicación:', error);
        }
    }

    return (
        <div className='subirPublicacion'>
            <h2>Subir Publicación</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" value={titulo} onChange={handleTituloChange} />
                </label>
                <br />
                <label>
                    Contenido:
                    <textarea value={contenido} onChange={handleContenidoChange} />
                </label>
                <br />
                <label>
                    Imagen:
                    <input type="file" onChange={handleImagenChange} />
                </label>
                <br />
                <button type="submit">Subir Publicación</button>
            </form>
        </div>
    );
}

export default SubirPublicacion;