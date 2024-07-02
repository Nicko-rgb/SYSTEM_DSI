const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost/systemdsi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y el modelo de la colección "users"
const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    estudiaEnIESTP: Boolean,
    carrera: String,
    email: String,
    password: String,
    fechaRegistro: Date
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    try {
        const { nombre, apellido, telefono, estudiaEnIESTP, carrera, email, password } = req.body;
        const fechaRegistro = new Date();

        const newUser = new User({
            nombre,
            apellido,
            telefono,
            estudiaEnIESTP,
            carrera,
            email,
            password,
            fechaRegistro
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});