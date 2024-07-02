const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost/systemdsi')
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y el modelo de la colección "users"
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// Ruta para obtener los datos de la colección "users"
app.get('/api/users/register', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});