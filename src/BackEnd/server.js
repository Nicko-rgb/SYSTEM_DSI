const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Configurar la conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/systemdsi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir el esquema de la colección
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    estudiaEnIESTP: { type: Boolean, required: true },
    carrera: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Crear el modelo de la colección
const User = mongoose.model('users', userSchema);

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Endpoint para manejar las solicitudes de registro
app.post('/api/register', async (req, res) => {
    const { nombre, apellido, telefono, estudiaEnIESTP, carrera, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo documento en la colección "system_dsi"
        const newUser = new User({ nombre, apellido, telefono, estudiaEnIESTP, carrera, email, password });
        await newUser.save();
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
        console.log("USUARIO NUEVO REGISTRADO");
    } catch (err) {
        res.status(400).json({ message: 'Error al registrar el usuario', error: err.message });
        console.log("ERROR AL REGISTRAR USUARIO");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log("http://localhost:3001/api/register");
});
