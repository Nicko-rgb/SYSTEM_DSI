const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Configura el servidor para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conecta con la base de datos MongoDB
mongoose.connect('mongodb://localhost/system_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define un esquema para las imágenes
const imageSchema = new mongoose.Schema({
    name: String,
    path: String,
});

// Crea un modelo para las imágenes
const Image = mongoose.model('publicaciones', imageSchema);

// Ruta para recuperar las imágenes
app.get('/images', async (req, res) => {
    try {
        const image = await Image.find();
        res.json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al recuperar las imágenes' });
    }
});

// Inicia el servidor
app.listen(5001, () => {
    console.log('Servidor iniciado en el puerto 5001');
});